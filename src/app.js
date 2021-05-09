const express=require("express");
const User=require("./API/Register/User");

//require('../../mongoosePractice/src/app')
const connection=require('./Connection/conn')
const PORT=8000;
const app=express();
app.use(express.json())

app.post('/user',async(req,res)=>{
    console.log(req.body)
    const user=new User(req.body);
    await user.save()
    .then(()=>console.log("Added"))
    .catch((err)=>console.log(err))
    console.log("studs")
})

app.post('/login',async(req,res)=>{
    try{
    console.log(req.body)
    const user=await User.findOne({email:req.body.email})
    if(user.password===req.body.password){
        console.log("logged in")
    }
    }
    catch(err){
        console.log(err)
    }
})

app.listen(PORT,(req,res)=>{
    console.log("connected")
})