var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    category: String,
    subcategory: String,
    description: String,
    price: String,
    product_collection: String,
    id: String,
    picturea: String,
    pictureb: String,
    picturec: String,
    pictured: String,
    date_created: String,
    days: String
});

var products = mongoose.model('products', productSchema);

module.exports = products;
