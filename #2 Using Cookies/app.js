var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var auth = require('./auth')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret-key'));

app.use(auth.auth)
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
