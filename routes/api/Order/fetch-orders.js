const Route = require('express').Router();
const Orders = require('../../models/order');

Route.get('/', async function (req, res) {
    try {
        await Orders.find().then(order => {
            if (!order) {
                return res.status(400).send('No Orders');
            } else {
                return res.status(200).json(order.reverse());
            }
        });
    } catch (err) {
        res.status(400).send('Internal Server errror');
    }
});

module.exports = Route;
