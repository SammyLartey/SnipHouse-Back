const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admins = require('../../models/admin');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../middlewares/jwt');

Route.post(
    '/',

    [
        check('email', 'email should not be empty')
            .not()
            .isEmpty()
            .isString()
            .isEmail(),

        check('password', 'Password should  not be empty')
            .not()
            .isEmpty()
            .isString(),
        check('last_name', 'Last Name should  not be empty')
            .not()
            .isEmpty()
            .isString(),
        check('first_name', 'First Name should  not be empty')
            .not()
            .isEmpty()
            .isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const {
                email,
                password,
                access_level,
                first_name,
                last_name
            } = req.body;

            let temp_id = `ADM${spawn
                .spawnAlphaNumericLength(10)
                .toUpperCase()}`;
            let temp_access;
            access_level === 'owner'
                ? (temp_access = 1)
                : access_level === 'worker'
                ? (temp_access = 2)
                : (temp_access = 3);
            const admin = new Admins({
                email: email.toLowerCase(),
                access_level: temp_access,
                id: temp_id,
                first_name,
                last_name,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync()),

                date_created: moment().format('MMM Do YYYY')
            });

            await Admins.findOne({
                email: email.toLowerCase()
            }).then(admins => {
                if (!admins) {
                    admin.save().then(admin => {
                        res.status(201).send('Added');
                    });
                } else {
                    res.status(400).send('Admin Already Exists');
                }
            });
        } catch (error) {
            res.status(422).status('Internal Server error');
        }
    }
);

module.exports = Route;
