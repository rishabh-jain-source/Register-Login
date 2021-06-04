const { response } = require('express');
const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient;
const URL='mongodb://localhost:27017'
const databse='MYDB';
const ObjectId=mongodb.ObjectID

MongoClient.connect(URL,{useNewUrlParser:true},(err,client)=>{
    if(err){
        return console.log("cannot connect to database")
    }
    console.log("CONNECTED TO DATABASE");
    const db=client.db(databse)
    db.collection('users').find({age:"20"}).toArray((err,user)=>{
        if(err){
            return console.log('no data found')
        }
        console.log(user)
    })
    db.collection('users').deleteMany({age:"20"})
    .then((result)=>console.log(result))
    .catch((err)=>console.log(err))
    db.collection('users').updateOne({_id:new ObjectId('60a4c121ac0a2236ac0adac9')},{
        $set:{
            name:"jaim RISHABHHHHH"
        }
    })
    .then((response=>console.log(response)))
    .catch(err=>console.log(err))
})