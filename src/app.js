const express = require("express");
const User = require("./API/Register/User");
var cors = require('cors')
const jwt = require("jsonwebtoken")
const authorization=require('./middleware/authorization')

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

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        const payload={
            user:{
                id:user.id
            }
        }
        // const token=jwt.sign(payload,"secretKeyHelloOneTwo")
        res.json("registered successfully")
        //.catch((err)=>res.send(err))
    }
    catch (err) {
        res.send(err)
    }

})

app.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        
        if (!!user) {
            if (user.password === req.body.password) {
                const payload={
                    user:{
                        id:user.id
                    }
                }
                const token=jwt.sign(payload,"secretKeyHelloOneTwo")
                res.json({token,user})
                // res.send({
                //     "message": "user login successfully",
                //     "status": "SUCCESS",
                //     "response": user
                // })
            }
            else{
                res.send({
                    "status": "FAILURE",
                    "error_code": "741",
                    "error_message": "Invalid email id or password."
                })
            }
        }
        else res.send({
            "status": "FAILURE",
            "error_code": "7013",
            "error_message": "User not found"
        })

    }
    catch (err) {
        res.send({
            "status": "FAILURE",
            "error_code": "741",
            "error_message": "Invalid email id or password."
        })
    }
})
app.get('/view', async (req, res) => {
    try {
        var user = [];
        user = await User.find();
        res.send(user);
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