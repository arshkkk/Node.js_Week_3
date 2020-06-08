var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Dish = new Schema({
    name:{
        type:String,
        require:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Dish',Dish)

