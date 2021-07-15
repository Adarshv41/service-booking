const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3},
    vehiclemodel:{type:String,required:true},
    mobile:{type:Number,required:true},
    servicetype:{type:String,required:true},
    date:{type:Date,required:true},
},{
    timestamps:true,
})

const Booking=mongoose.model('booking',bookingSchema);
module.exports=Booking;