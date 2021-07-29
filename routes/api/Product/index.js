const productRouter = require('express').Router();

productRouter.use('/add-product', require('./add-product'));
productRouter.use('/fetch-products', require('./fetch-products'));
productRouter.use('/fetch-category', require('./fetch-category'));
productRouter.use('/delete-product', require('./delete-product'));
// productRouter.use('/update-product', require('./update-product'));

module.exports = productRouter;
