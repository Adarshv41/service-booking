const router=require('express').Router();
const Services=require('../model/servicemodel');
// const { route } = require('./booking');

//get all services
router.get('/',(req,res)=>{
    Services.find()
    .then(services=>res.json(services))
    .catch(err=>res.status(400).json('Error',err));
})

//add a new service
router.post('/',(req,res)=>{
    const servicename=req.body.servicename;
    const price=Number(req.body.price);
    const time=Date.parse(req.body.time);


    const newServices=new Services({
        servicename,price,time,
    });

    newServices.save()
    .then(()=>res.json('Services added...'))
    .catch(err=>res.status(400).json('Error: '+err))
})

//delete a service
router.delete('/:id',(req,res)=>{
    Services.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Service deleted...'))
    .catch(err=>res.status(400).json('Error: ',err))
})

//update a specific service
router.post('/:id',(req,res)=>{
    Services.findById(req.params.id)
    .then(services =>{
        services.servicename=req.params.servicename;
        services.price=Number(req.params.price);
        services.time=Date(req.params.time);

        services.save()
        .then(()=>res.json('Service updated...'))
        .catch(err=>res.status(400).json('Error: ',err));

    })
    .catch(err=>res.status(400).json('Error: ',err))
})

//get specific service 
router.get('/:id',(req,res)=>{
    Services.findById(req.params.id)
    .then(services=>res.json(services))
    .catch(err=>res.status(400).json('Error: ',err));
})
module.exports=router;