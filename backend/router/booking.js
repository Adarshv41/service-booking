const router=require('express').Router();
const Booking=require('../model/bookingmodel');

//get the booking
router.get('/',(req,res)=>{
    Booking.find()
    .then(booking=>res.json(booking))
    .catch(err=>res.status(400).json('Error: ',err))
})

//book the service
router.post('/', (req,res)=>{
   // try{
        const name=req.body.name;
        const vehiclemodel=req.body.vehiclemodel;
        const mobile=req.body.mobile;
        const servicetype=req.body.servicetype;
        const date=Date.parse(req.body.date)

        //save to db
        const newBooking= new Booking({
            name,vehiclemodel,mobile,servicetype,date,
        });
         newBooking.save()
        .then(()=>res.json('Booking saved...'))
        .catch(err=>res.status(400).json('Error: '+err))
    //}catch(err){
        //console.log(err);
       // res.status(500).send();
    //}
})

//get specific booking 
router.get('/:id',(req,res)=>{
    Booking.findById(req.params.id)
    .then(booking=>res.json(booking))
    .catch(err=>res.status(400).json('Error: ',err));
})

//delete specific booking
router.delete('/:id',(req,res)=>{
    Booking.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Booking deleted...'))
    .catch(err=>res.status(400).json('Error: ',err));
})

module.exports=router;