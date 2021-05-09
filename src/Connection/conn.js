const mongoose=require("mongoose");
const connection=mongoose.connect("mongodb://localhost:27017/Demo",{ useNewUrlParser: true,useUnifiedTopology: true} )
.then(()=>{console.log("connected")})
.catch((err)=>{console.log(err)})
module.exports=connection