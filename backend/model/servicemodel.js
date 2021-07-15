const mongoose=require('mongoose');

const serviceSchema=new mongoose.Schema({
    servicename:{type:String,required:true},
    price:{type:Number,required:true},
    time:{type:Date,required:true},
})

const Services = mongoose.model('services',serviceSchema);
module.exports=Services;