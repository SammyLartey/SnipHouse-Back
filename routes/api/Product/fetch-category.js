const Route = require('express').Router();
const Product = require('../../models/product');

Route.get('/', async function (req, res) {
    try {
        const { category } = req.query;
        await Product.find({ category: category.toLowerCase() }).then(
            product => {
                if (!product) {
                    return res.status(400).send('No Product');
                } else {
                    return res.status(200).json(product);
                }
            }
        );
    } catch (err) {
        res.status(400).send('Internal Server errror');
    }
});

module.exports = Route;
