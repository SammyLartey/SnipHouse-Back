const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Orders = require('../../models/order');

const authentication = require('../../middlewares/jwt');

Route.post(
    '/',

    [check('id', 'id should not be empty').not().isEmpty().isString()],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { id } = req.body;

            await Orders.findOne({
                order_id: id
            }).then(order => {
                if (order) {
                    Orders.updateOne(
                        { order_id: id },
                        {
                            completed: !order.completed
                        }
                    ).then(orderdone => {
                        res.status(200).send('Updated');
                    });
                } else {
                    res.status(400).send('Could Not update');
                }
            });
        } catch (error) {
            res.status(422).status('Internal Server error');
        }
    }
);

module.exports = Route;
