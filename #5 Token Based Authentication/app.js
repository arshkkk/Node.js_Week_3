var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var cookieParser = require('cookie-parser')

var User = require('./model/user')
var config = require('./config')
var user = require('./routes/users')
var jwtToken = require('./jwt-token')

mongoose.connect(config.mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err) console.log(err)
}).then(db=>{
    console.log('Mongodb connected')
    
})


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret-key-of-myserver-cookies'))


passport.use(new LocalStrategy(User.authenticate()),)

app.use(passport.initialize())

app.use('/user',user)

app.use(jwtToken.verifyUser, express.static(path.join(__dirname, 'public')));



module.exports = app;
