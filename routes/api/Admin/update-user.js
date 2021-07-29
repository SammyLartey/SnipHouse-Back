const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admins = require('../../models/admin');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../middlewares/jwt');

Route.post(
    '/',

    [check('email', 'email should not be empty').not().isEmpty().isString()],

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
                id,
                last_name,
                first_name
            } = req.body;

            let temp_access;
            access_level === 'Owner' ? (temp_access = 1) : (temp_access = 2);

            await Admins.findOne({
                id: id
            }).then(admins => {
                if (admins) {
                    Admins.updateOne(
                        { id: id },
                        {
                            email: email,
                            access_level: temp_access,
                            password: bcrypt.hashSync(
                                password,
                                bcrypt.genSaltSync()
                            ),
                            last_name: last_name,
                            first_name: first_name
                        }
                    ).then(admin => {
                        res.status(200).send('Updated');
                    });
                } else {
                    res.status(400).send('Could Not update');
                }
            });
        } catch (error) {
            res.status(422).status('Internal Server error');
        }
    }
);

module.exports = Route;
