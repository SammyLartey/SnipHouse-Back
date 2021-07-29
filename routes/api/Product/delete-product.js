const Route = require('express').Router();
const { query, validationResult } = require('express-validator');
const Products = require('../../models/product');
const authentication = require('../../middlewares/jwt');

Route.get(
    '/',

    [query('product_id', 'product id error').trim().escape()],

    async function (req, res) {
        try {
            const { product_id } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Products.deleteOne({ id: product_id }).then(product => {
                return res.status(200).send('User deleted');
            });
        } catch (err) {
            res.status(422).send('Internal Server Error');
        }
    }
);

module.exports = Route;
