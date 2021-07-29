var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Database Schema
var bookingSchema = new Schema({
    email: String,
    country: String,
    town: String,
    address: String,
    date: String,
    reason: String,
    first_name: String,
    last_name: String,
    phone_number: String,
    booking_id: String,
    booking_type: String,
    date_created: String
});

//User Schema
var booking = mongoose.model('booking', bookingSchema);

module.exports = booking;
