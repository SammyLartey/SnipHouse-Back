var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSChema = new Schema({
    name: String,

    id: String,
    picture: String,
    author: String,
    body: String,
    date_created: String
});

var blogs = mongoose.model('blogs', blogSChema);

module.exports = blogs;
