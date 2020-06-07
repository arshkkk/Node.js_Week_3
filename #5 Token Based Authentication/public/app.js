var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var auth = require('./auth')
var User = require('./model/user')

var url = 'mongodb://localhost:27017/#4_Week3_Passport'

mongoose.connect(url).then(db=>{
    console.log('Mongodb connected')
})

var auth = require('./auth')
var user = require('./routes/users')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    name:'session-id',
    secret:'secret-key',
    saveUninitialized:false,
    resave:false,
    store:new FileStore()
}))

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(passport.initialize())
app.use(passport.session())


app.use('/user',user)

app.use(auth.auth)
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
