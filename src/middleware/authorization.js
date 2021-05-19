const jwt=require("jsonwebtoken");

module.exports=async function(req,res,next){
    //GET TOKEN
    const token=req.header('authorization')
    console.log("MYTOKEN--->>>",token)
    if(!!!token){
        return res.json("No Token")
    }
    try{
        const decoded=jwt.verify(token,"secretKeyHelloOneTwo")
        req.user=decoded.user;
        next();
    }
    catch(err){
        res.json({err})
    }
}