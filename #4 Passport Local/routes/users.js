var express = require('express')
var app = express()
var User= require('../model/user')
var passport = require('passport')


app.post('/login',passport.authenticate('local'),(req,res,next)=>{

     res.json({result:null, message:'Logged In Successfull', success:true})

    
    })

app.post('/signup',(req,res,next)=>{


    User.register(new User({username:req.body.username}), req.body.password, (err,user)=>{

        if(err) return res.json(500,{result:err, success:false, message: 'Internal server error'})
        
        res.json(200,{result:user,success:true,message:"Registration Successfull"})
        // passport.authenticate('local',(req,res,()=>{
        //    return res.json({result:null, message:'Registration Successfull', success:true})
        // }))

    })

})

app.get('/logout',(req,res,next)=>{

    req.session.destroy()
    res.clearCookie('session-id')

    res.json({result:null, success:true, message:'Logged Out Successfully'})

})

module.exports = app