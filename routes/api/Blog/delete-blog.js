const Route = require('express').Router();
const { query, validationResult } = require('express-validator');
const Blogs = require('../../models/blog');
const authentication = require('../../middlewares/jwt');

Route.get(
    '/',

    [query('blog_id', 'blog id error').trim().escape()],

    async function (req, res) {
        try {
            const { blog_id } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Blogs.deleteOne({ id: blog_id }).then(product => {
                return res.status(200).send('Blog deleted');
            });
        } catch (err) {
            res.status(422).send('Internal Server Error');
        }
    }
);

module.exports = Route;
