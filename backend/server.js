const express=require('express');
const app=express();
const mongoose=require('mongoose')
require('dotenv').config();
const cors=require('cors');

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server started on port ${port}`));

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
 
//console.log("uri ",uri)
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Mongodb connection established successfully');
})

//importing the router
const userRouter=require('./router/user')
const adminRouter=require('./router/admin')
const bookingRouter=require('./router/booking')
const serviceRouter=require('./router/services')

app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/booking',bookingRouter);
app.use('/services',serviceRouter);
