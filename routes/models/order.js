var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var orderSchema = new Schema({
    order_id: String,
    payment_reference: String,
    buyer_first_name: String,
    buyer_last_name: String,
    buyer_address: String,
    buyer_town: String,
    buyer_country: String,
    buyer_zip: String,
    buyer_email: String,
    buyer_number: String,
    delivery_date: String,
    order_items: Array,
    payment_amount: String,
    completed: { type: Boolean, default: false },
    date_created: String
});

var order = mongoose.model('order', orderSchema);

// make this available to our users in our Node applications
module.exports = order;
