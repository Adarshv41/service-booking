const router=require('express').Router();
const Admin=require('../model/adminmodel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//admin registration
router.post('/',async (req,res)=>{
    try{
        const{email,password,passwordVerify}=req.body;
        //validation
        if(!email || !password ||!passwordVerify)
        return res.status(400).json({errorMessage:'Please enter all the field'});

        if(password.length < 6)
        return res.status(400).json({errorMessage:'please enter password of atleast 6 character'});
         
        if(password !== passwordVerify)
        return res.status(400).json({errorMessage:'Please enter same password as above'});

        //existing admin
        const adminExist= await Admin.findOne({email})
        if(adminExist)
        return res.status(400).json({errorMessage:'Admin exist'});

        //pasword hash
        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt)

        //save admin to db
        const newAdmin=new Admin({
            email,passwordHash
        });
        const savedAdmin=await newAdmin.save()
        .then(()=>res.json('Admin saved...'))
        .catch(err=>res.status(400).json('Error: ',err));

        //sign the token
    const token=jwt.sign({
        user:savedAdmin._id,
    },process.env.JWT_SECRET);

    //send the token in the HTTP-cookies
    res.cookie('token',token,{
        httpOnly:true,
    });
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
})

//admin login
router.post('/login', async (req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email || !password)
        return res.status(400).json({errorMessage:'Please enter all the field'});
        
        //check email is correct
        const adminExist=await Admin.findOne({email})
        if(!adminExist)
        return res.status(401).json({errorMessage:'Wrong email or password'});

        //checck password is correct
        const passwordCorrect=await bcrypt.compare(password,adminExist.passwordHash)
        if(!passwordCorrect)
        return res.status(401).json({errorMessage:'Wrong email or password'})
        
          //sign the token
    const token=jwt.sign({
        user:adminExist._id,
    },process.env.JWT_SECRET);

    //send the token in the HTTP-cookies
    res.cookie('token',token,{
        httpOnly:true,
    });
    }catch(err){
        console.log(err)
        return status(500).send();
    }

    //admin logout
    router.get('/logout',(req,res)=>{
        res.cookies('token',"",{
            httpOnly:true,
            expire:Date(0)
        })
        .send()
    })
})

//get all admin
router.get('/all',(req,res)=>{
    Admin.find()
    .then(admin=>res.json(admin))
    .catch(err=>res.status(400).json('Error: ',err));
})

//get specific admin
router.get('/:id',(req,res)=>{
    Admin.findById(req.params.id)
    .then(booking=>res.json(booking))
    .catch(err=>res.status(400).json('Error: ',err));
})

//delete admin
router.delete('/:id',(req,res)=>{
    Admin.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Admin deleted...'))
    .catch(err=>res.status(400).json('Error: ',err));
})

module.exports=router;
