const mongoose=require("mongoose");
const validator=require("validator");

const studentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minlength:3,
        require:true
    },
    lastName:{
        type:String,
        minlength:3,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already Registered"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:10,
        require:true,
        unique:[true,"Number already exists"]
    },
})
const Student=new mongoose.model("User",studentSchema);
module.exports=Student