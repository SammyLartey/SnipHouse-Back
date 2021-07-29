const Route = require('express').Router();
const { query, validationResult } = require('express-validator');
const Admin = require('../../models/admin');
const authentication = require('../../middlewares/jwt');

Route.get(
    '/',

    [query('email', 'email error').trim().escape()],

    async function (req, res) {
        try {
            const { email } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Admin.deleteOne({ email: email }).then(user => {
                return res.status(200).send('User deleted');
            });
        } catch (err) {
            res.status(422).send('Internal Server Error');
        }
    }
);

module.exports = Route;
