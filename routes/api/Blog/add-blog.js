const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Blogs = require('../../models/blog');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../middlewares/jwt');

Route.post(
    '/',

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { name, body } = req.body;

            let temp_id = `BLOG${spawn
                .spawnAlphaNumericLength(10)
                .toUpperCase()}`;

            const blog = new Blogs({
                name,

                id: temp_id,
                picture: 'unknown',
                author: 'SnipHouse',
                body,
                date_created: moment().format('MMM Do YYYY')
            });
            await blog.save().then(blog => {
                res.status(201).send('Added');
            });
        } catch (error) {
            res.status(422).status('Internal Server error');
        }
    }
);

module.exports = Route;
