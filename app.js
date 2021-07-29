var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
var indexRouter = require('./routes/index');

var mongoose = require('mongoose');

const csurf = require('csurf');

var app = express();
require('dotenv').config();
const cors = require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// app.use(cors());
//#################CSURF SETUP######################

if (process.env.CSRF === 'on') {
    console.log('true');
    app.use(csurf({ cookie: { httpOnly: true } }));

    app.use(function (req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });

    app.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err);

        // handle CSRF token errors here
        res.status(403);
        res.send('form tampered with');
    });
}

//####################Setting up Mongoose Connection#################

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose Connected');
});

//###############APP Route SETUP###########################

app.use('/', indexRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}
if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname, 'public')));
}

//############# catch 404 and forward to error handler###########
app.use(function (req, res, next) {
    next(createError(404));
});

console.log('APP JS ' + process.env.NODE_ENV);

// ##################### error handler #################
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
