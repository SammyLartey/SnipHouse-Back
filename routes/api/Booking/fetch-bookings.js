const Route = require('express').Router();
const Booking = require('../../models/bookings');
const authentication = require('../../middlewares/jwt');
Route.get('/', async function (req, res) {
    try {
        await Booking.find().then(blog => {
            if (!blog) {
                return res.status(400).send('No Admins');
            } else {
                return res.status(200).json(blog.reverse());
            }
        });
    } catch (err) {
        res.status(400).send('Internal Server errror');
    }
});

module.exports = Route;
