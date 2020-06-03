var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var mongoose = require('mongoose')

var url = 'mongodb://localhost:27017/Week_3_Session'
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


app.use('/user',user)

app.use(auth.auth)
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
