const orderRouter = require('express').Router();

orderRouter.use('/fetch-orders', require('./fetch-orders'));

orderRouter.use('/update-order', require('./update-order'));

module.exports = orderRouter;
