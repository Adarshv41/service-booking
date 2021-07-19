const mongoose=require('mongoose');

const serviceSchema=new mongoose.Schema({
    servicetype:{type:String,required:true},
    price:{type:Number,required:true},
    time:{type:Number,required:true},
})

const Services = mongoose.model('services',serviceSchema);
module.exports=Services;