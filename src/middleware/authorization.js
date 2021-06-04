const jwt=require('jsonwebtoken')
module.exports=function(req,res,next){
    const token=req.header("Authorization")
    if(!token){
       return res.status(401).json({msg:"NO TOKEN CANNOT ACCESS"})
    }
    const decoder=jwt.verify(token,"secretKeyHelloOneTwo")
    req.user=decoder.user;
    console.log(req.user)
    console.log("authorization",req.user)
    next();
}
