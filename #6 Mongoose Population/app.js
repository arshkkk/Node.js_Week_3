var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var cookieParser = require('cookie-parser')

//Models
var User = require('./model/user')

//Routes
var user = require('./routes/users')
var dish = require('./routes/dish')

//Config
var config = require('./config')

//Authentication
var jwtToken = require('./jwt-token')


mongoose.connect(config.mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err) console.log(err)
    else console.log('Mongodb connected')
})


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret-key-of-myserver-cookies'))


passport.use(new LocalStrategy(User.authenticate()),)

app.use(passport.initialize())

app.use('/user',user)
app.use('/dish',jwtToken.verifyUser,dish)
app.use(jwtToken.verifyUser, express.static(path.join(__dirname, 'public')));



module.exports = app;
