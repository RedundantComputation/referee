var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan')
var mongoose = require('mongoose')
var path = require('path');

mongoose.connect('mongodb://localhost/match');

var matchRouter = require("./routes/routes");
var { json } = require('body-parser');

var app = express();

// engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use("/routes", matchRouter)

// catch 404
app.use((req, res, next) => {
    next(createError(404));
});

// exception handler
app.use((err, req, res, next) => {
    // provide development errors
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
