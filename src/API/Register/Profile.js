const mongoose=require("mongoose");
const validator=require("validator");
const profileSchema=new mongoose.Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
  },
  company:{
      type:String
  } ,
  website:{
      type:String
  },
  location:{
    type:String
},
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubUsername:{
        type:String
    }
})
const Profile=new mongoose.model("Profile",profileSchema)
module.exports =  Profile