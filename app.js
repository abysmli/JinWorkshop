var express = require('express');
var partials = require('express-partials');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var session = require('express-session');

var routes = require('./routes/index');
var controller = require('./routes/controller');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());
app.use(session({
    secret: process.env.EXPRESS_SECRET || 'JinWorkshop',
    key: "J&&L",
    cookie: {
        secure: false
    },
    resave: true,
    saveUninitialized: true
}));


app.use('/', routes);
app.use('/controller', controller);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
