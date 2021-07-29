const Route = require('express').Router();

const { check, validationResult } = require('express-validator');
const Products = require('../../models/product');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../middlewares/jwt');
const multer = require('multer');
var AWS = require('aws-sdk');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

Route.post(
    '/',
    upload.array('file'),

    [
        check('name', 'name should not be empty').not().isEmpty().isString(),
        check('description', 'Description should  not be empty')
            .not()
            .isEmpty()
            .isString(),
        check('price', 'price should  not be empty').not().isEmpty(),

        check('days', 'days should  not be empty').not().isEmpty()
    ],

    async function (req, res, next) {
    
            let extra = spawn.spawnAlphaNumericLength(10);
            let timestamp = Date.now();
            let new_fileName = `PRODUCT${extra}${timestamp}`;
            let picture_holder = [];
            let i = 0;

            const file = req.files;
            const s3FileURL = process.env.AWS_URI;
            console.log(file);

            while (i < 4) {
                let extractedfileName1 = file[i].originalname.substring(
                    file[i].originalname.lastIndexOf('.'),
                    file[i].originalname.length
                );
                picture_holder.push(
                    `${s3FileURL}sammy/${new_fileName}${i}${extractedfileName1}`
                );
                i++;
            }

            let s3bucket = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
                region: process.env.AWS_REGION
            });
            let p = 0;
            file.map(item => {
                let extractedfileName = item.originalname.substring(
                    item.originalname.lastIndexOf('.'),
                    item.originalname.length
                );

                let params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `sammy/${new_fileName}${p}${extractedfileName}`,
                    Body: item.buffer,
                    ContentType: item.mimetype,
                    ACL: 'public-read'
                };

                s3bucket.upload(params, async function (err, data) {
                    if (err) {
                        return res.status(500).json({
                            error: true,
                            Message: err
                        });
                    } else {
                    }
                });
                p++;
            });

            const { name, description, price, category_id, days, subcategory } =
                req.body;

            let temp_id = `PR${spawn
                .spawnAlphaNumericLength(10)
                .toUpperCase()}`;

            const product = new Products({
                name: name,
                description: description,
                id: temp_id,
                category: category_id.toLowerCase(),
                subcategory: subcategory.toLowerCase(),
                price: price.toString(),
                days: days,
                picturea: picture_holder[0],
                pictureb: picture_holder[1],
                picturec: picture_holder[2],
                pictured: picture_holder[3],

                date_created: moment().format('MMM Do YYYY')
            });

            await Products.findOne({
                id: temp_id
            }).then(productss => {
                if (!productss) {
                    product.save().then(admin => {
                        return res.status(201).send('Added');
                    });
                } else {
                    res.status(400).send('Product Already Exists');
                }
            });
        } 
    
);

module.exports = Route;
