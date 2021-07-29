const Route = require('express').Router();
const Product = require('../../models/product');

Route.get('/', async function (req, res) {
    try {
        await Product.find().then(product => {
            if (!product) {
                return res.status(400).send('No Product');
            } else {
                return res.status(200).json(product.reverse());
            }
        });
    } catch (err) {
        res.status(400).send('Internal Server errror');
    }
});

module.exports = Route;
