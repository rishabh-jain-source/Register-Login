const mongoose=require("mongoose");
const connection=mongoose.connect("mongodb://localhost:27017/Demo",{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false} )
.then(()=>{console.log("Database connected")})
.catch((err)=>{console.log(err)})
module.exports=connection