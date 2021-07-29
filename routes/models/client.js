var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Database Schema
var clientSChema = new Schema({
    email: String,
    country: String,
    state_region: String,
    address: String,
    first_name: String,
    last_name: String,
    phone_number: String,
    id: String,
    date_created: String
});

//User Schema
var client = mongoose.model('client', clientSChema);

module.exports = client;
