const router=require('express').Router();
const User=require('../model/usermodel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//registration
router.post('/',async (req,res)=>{
    try{
        const{name,email,password,passwordVerify}=req.body;

        //validatiion
        if(!name || !email || !password || !passwordVerify)
        return res.status(400).json({errorMessage:'Please enter all the field'});

        if(name.lenth < 3)
        return res.status(400).json({errorMessage:'Name should be minimum of 3 character'});

        if(password.length < 6)
        return res.status(400).json({errorMessage:'Please enter a password of atleast 6 character'});

        if(password !== passwordVerify)
        return res.status(400).json({errorMessage:'Please enter same password as above'});

        //problem with the existinguser
        const existingUser= await User.findOne({email:email}) 
        if(existingUser)
        return res.status(400).json({errorMessage:'User exisit'});
   
        //pasword hash
        const salt= await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password,salt);

        //save user to db
        const newUser=new User({
            email,passwordHash
        });
        const savedUser=await newUser.save()
        .then(()=>res.json('User added...'))
        .catch(err=>res.status(400).json('Error: '+err));
    
    //sign the token
    const token=jwt.sign({
        user:savedUser._id,
    },process.env.JWT_SECRET);

    //send the token in the HTTP-cookies
    res.cookie('token',token,{
        httpOnly:true,
    });
    
    
    }catch (err){
        console.log(err);
        res.status(500).send();
    }
})


//user login
router.post('/login',async (req,res)=>{
    try{
        const{email,password}=req.body;
        //validation
        if(!email || !password)
        return res.status(400).json({errorMessage:'Please enter all the field'});
       //check email is correct
        const existingUser=await User.findOne({email})
        if(!existingUser)
        return res.status(401).json({errorMessage:'Wrong email or password'})
        //check password is correct
        const passwordCorrect=await bcrypt.compare(password,existingUser.passwordHash);
        if(!passwordCorrect)
        return res.status(400).json({errorMessage:'Wrong email or password'});


        //sign the token
    const token=jwt.sign({
        user:existingUser._id,
    },process.env.JWT_SECRET);

    //send the token in the HTTP-cookies
    res.cookie('token',token,{
        httpOnly:true,
    });

    } catch (err){
        console.log(err);
        res.status(500).send();
    }
})

//logout
router.get('/logout',(req,res)=>{
    res.cookies('token',"",{
        httpOnly:true,
        expire:new Date(0),
    })
    .send();
})

//get all users
router.get('/all',(req,res)=>{
    User.find()
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error: '));
})

//get specific user 
router.get('/:id',(req,res)=>{
    User.findById(req.params.id)
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error: '+err));
}) 

//delete a user
router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>res.json('User deleted...'))
    .catch(err=>res.status(400).json('Error: ',err));
})

//update a user
router.put('/:id',(req,res)=>{
    User.findById(req.params.id)
    .then(user =>{
        user.name=req.params.name;
        user.email=req.params.email;
        user.password=req.params.password;
        
        user.save()
        .then(res=>res.json('User updated...'))
        .catch(err=>res.status(400).json('Error: ',err));

    })
    .catch(err=>res.status(400).json('Error: ',err))
})



module.exports=router;