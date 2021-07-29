const bookingRouter = require('express').Router();

bookingRouter.use('/fetch-bookings', require('./fetch-bookings'));

module.exports = bookingRouter;
