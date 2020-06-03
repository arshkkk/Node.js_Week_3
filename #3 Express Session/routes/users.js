var express = require('express')
var app = express()
var User= require('../model/user')

app.post('/login',(req,res,next)=>{


        var authHeader = req.headers.authorization
        var username,password;
        if(req.body.username!==null&&req.body.password!==null){
            username=req.body.username;
            password = req.body.password
        }
        if(authHeader){

            var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':') //array containing user and pass
        
            var username = auth[0]
            var password = auth[1]
    
        }
        if(authHeader===null&&req.body.username===null&&req.body.password===null){
            res.setHeader('WWW-Authenticate', 'Basic')
            return res.json(401,{result:null, message: "you need to authenticate", success:false})
        }

        console.log(username+" "+password)

        User.findOne({username:username},(err,user)=>{

            if(err)
            res.json(501,{result:null,success:false,message:'Internal Server Error'})

            if(user===null)
            return res.json({result:null,success:false,message:'User not present'})

            if(user.password!==password)
            return res.json({result:null,success:false,message:'password is not correct'})

            req.session.userId=user._id

            return res.json({result:user, message:"successfully logged in and session-cookie setup",success:true})

        })

    })

app.post('/signup',(req,res,next)=>{
    console.log(req.body)
    User.findOne({username:req.body.username})
        .then(user=>{

            if(user!=null)
            return res.json({success:false, result:null, message:'Username not Available'})

            return User.create({
                username:req.body.username,
                password:req.body.password
            })
        })
        .then(user=>{
            res.json(200,{success:true,result:user,message:'User saved to Database'})
        })
        .catch(err=>{
            console.log('Mongodb Error '+ err.message)

            return res.json(501,{success:false,result:null, message:'Internal server error'})
        })

})
module.exports = app