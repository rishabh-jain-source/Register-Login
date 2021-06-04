const express = require("express");
const { check, validationResult } = require('express-validator');
const User = require("./API/Register/User");
const Profile=require('./API/Register/Profile')
var cors = require('cors')
const jwt = require("jsonwebtoken")
const authorization=require('./middleware/authorization')

const {ObjectId} =require('mongodb')
//require('../../mongoosePractice/src/app')
const connection = require('./Connection/conn');

const PORT = 8000;
const app = express();
app.use(express.json())
app.use(cors())

// const createToken=async ()=>{
//     const token= await jwt.sign({_id:'6097edc6acba051c506cefcc'},"rishabhjainsourcesoftsolutions.com")
//     console.log(token);
//     const userVerification=await jwt.verify(token,"rishabhjainsourcesoftsolutions.com")
//     console.log(userVerification)
// }
// createToken();

app.post('/register',
[
    check('firstName','firstname is required')
    .not().isEmpty(),
    check('lastName','lastname is required')
    .not().isEmpty(),
    check('email',"email not valid")
    .isEmail(),
    check("password","password of min length 6 is required")
    .isLength({min:6}),
    check("phone","invalid phone")
    .isMobilePhone()
],
 async (req, res) => {
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({errors:[{msg:"Email already exist"}]})
        }
        const userByPhone=await User.findOne({phone:req.body.phone})
        if(userByPhone){
            return res.status(400).json({errors:[{msg:"Mobile already exist"}]})
        }
        console.log(req.body)
        const myuser = new User(req.body);
        console.log("user",myuser)
        await myuser.save()
        const payload={
            user:{
                id:myuser.id
            }
        }
        const token=jwt.sign(payload,"secretKeyHelloOneTwo")
        return res.status(200).json({token,myuser})
        
    }
    catch (err) {
        res.send(err)
    }

})
app.patch("/updateuser" , async (req,res)=>{
    try{
        const user =await User.findOne({email:req.body.email})
            // {
            //     $set:{
            //         firstName:req.body.firstName
            //     }
            // }
            
            // ).then((res)=>res.json()
            // .then((resp)=>{console.log(resp)}))
        if(!!user){
            console.log(user.id)
            if(user.password===req.body.oldpassword){
                // const result=await User.updateOne({_id:req.body.id})
                const result= await User.updateOne({_id:user.id,
                    $set:{
                        firstName:req.body.firstName
                    }
                }).then((res)=>res.json().then((resp)=>console.log(resp)))
                
            }
        }
        
    }
    catch(e){
        res.send("error");
    }
})

app.post('/login',[
    check('email',"email not valid")
    .isEmail(),
    check("password","enter password")
    .isLength({min:6})
], async (req, res) => {
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const myuser = await User.findOne({ email: req.body.email })
        if(!myuser) {
            return res.status(404).json({errors:[{msg:"USER NOT FOUND"}]})
        }
        if (!!myuser) {
            if (myuser.password === req.body.password) {
                const payload={
                    user:{
                        id:myuser.id
                    }
                }
                const token=jwt.sign(payload,"secretKeyHelloOneTwo")
                res.json({token,myuser})
            }
            else{
                return res.status(400).json({errors:[{msg:"Invalid Email or Password"}]})
            }
        }
    }
    catch (err) {
        return res.status(400).json({errors:[{msg:"Server Error"}]})
    }
})
app.get('/me',authorization,async (req,res)=>{
    try{
        console.log(req.user.id)
        const user=await Profile.findOne({user:req.user.id}).populate('user',['firstName'])
        console.log(user)
        if(!!user){
            console.log(user)
            res.status(200).json({user})
        }
        else{
            res.status(404).json({errors:[{msg:"USER NOT FOUND"}]})
        }
    }
    catch(err){
        res.status(400).json({errors:[{msg:"Internal server error"}]})
    }
})
app.post('/profile',[
    check('status',"STATUS IS REQUIRED").not().isEmpty(),
    check('skills','SKILLS ARE REQUIRED').not().isEmpty()
],authorization,async (req,res)=>{
    const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        console.log(req.user.id)
        const profile=new Profile(req.body);
        console.log(profile);
        //profile object
        const {
            user,
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubUsername
        }=req.body
        const profileObject={}
        profileObject.user=req.user.id;
        
        if(company) profileObject.company=company
        if(website) profileObject.website=website
        if(location) profileObject.location=location
        if(status) profileObject.status=status
        if(skills) profileObject.skills=skills.split(',').map(skill=>skill.trim())
        if(bio) profileObject.bio=bio
        if(githubUsername) profileObject.githubUsername=githubUsername
        console.log(profileObject)
        //await profile.save(profileObject)
       // res.send()
       try{
            const profile=await Profile.findOne({user:req.user.id})
            if(!profile){
                profile.save(profileObject)
            }
            else{
                res.send("NOT")
            }
       }
       catch(err){

       }
    
})
app.get('/view',authorization, async (req, res) => {
    try {
        //var user = [];
        console.log(req.user.email)
        const user = await User.findOne({email:req.user.email})
        if(!user){
            res.status(404).json("NO USE FOUND")
        }
        console.log(user)
        
        
        res.status(200).json({user});
    }
    catch (err) {
        console.log(err);
    }
})
// app.post('/view/:id',async (req,res)=>{
//     try{
//         const user=await User.findById(req.params.id)
//         if(user){
//             console.log(user)
//             res.send({user})
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// })
app.listen(PORT, (req, res) => {
    console.log("connected")
})