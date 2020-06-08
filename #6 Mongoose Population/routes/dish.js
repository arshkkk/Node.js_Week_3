var express = require('express')
var app = express()
var Dish = require('../model/dish')


app.post('/createDish',(req,res,next)=>{
    Dish.create({
        name:req.body.name,
        createdBy:req.userId
    }).then(dish=>{
        return res.json({success:true,result:dish,message:"Dish created and Saved"})
    })
    .catch(err=>{
        return res.json(500,{success:false,result:err.message,message:"dish not created"})
    })
})

app.get('/getDish',(req,res,next)=>{
    Dish.find({}).populate('createdBy')
    .then(dishes=>{
        return res.json({success:true,result:dishes,message:"Dishes are fetched"})
    })
    .catch(err=>{
        return res.json(500,{success:false,result:err.message,message:"dish not created"})
    })

})

app.get('/ip',(req,res,next)=>{
    res.json({ip:req.connection.remoteAddress})
})

module.exports = app