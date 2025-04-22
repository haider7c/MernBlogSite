const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId
let userRoutes = express.Router();
const bcrypt = require("bcrypt")
const SALT_ROUNDS = 6

//#1 - Retrieve All
//http://localhost:3000/users

userRoutes.route("/users").get(async(request, response)=>{
    let db = database.getDb();
    let data = await db.collection("users").find({}).toArray()
    if(data.length>0){
        response.json(data)
    }else{
        throw new Error("Data was not found :(")
    }
})

//#2 - Retrieve One 
//http://localhost:3000/users/12345

userRoutes.route("/users/:id").get(async(request, response)=>{
    let db = database.getDb();
    let data = await db.collection("users").findOne({_id:new ObjectId(request.params.id)})
    if(Object.keys(data).length>0){
        response.json(data)
    }else{
        throw new Error("Data was not found :(")
    }
})

//#3 - Create One 
//http://localhost:3000/users

userRoutes.route("/users").post(async(request, response)=>{
    let db = database.getDb();
    const takenEmail = await db.collection("users").findOne({email:request.body.email})
    if(takenEmail){
        response.json({message:"This email is taken!"})
    }else{
        const hash = await bcrypt.hash(request.body.password,SALT_ROUNDS)
        let mongoObject = {
            name: request.body.name,
            email: request.body.email,
            password: hash,
            joinDate: new Date(),
            posts: []
        }
        let data = await db.collection("users").insertOne(mongoObject)
       response.json(data)
    }
   
})

//#4 - Update One 
//http://localhost:3000/users

userRoutes.route("/users/:id").put(async(request, response)=>{
    let db = database.getDb();
    let mongoObject = {
       $set:{
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        joinDate: request.body.joinDate,
        posts: request.body.posts
    }
    }
    let data = await db.collection("users").updateOne({_id:new ObjectId(request.params.id)},mongoObject)
   response.json(data)
})

//#5 - Delete One


userRoutes.route("/users/:id").delete(async(request, response)=>{
    let db = database.getDb();
    let data = await db.collection("users").deleteOne({_id:new ObjectId(request.params.id)})
    response.json(data)
})

//#6 - Login
//http://localhost:3000/users

userRoutes.route("/users/login").post(async(request, response)=>{
    let db = database.getDb();
    const user = await db.collection("users").findOne({email:request.body.email})
   if (user){
    let confirmation = await bcrypt.compare(request.body.password, user.password)
    if(confirmation){
        response.json({success: true, user})
    }else{
        response.json({success: false, mesage:"Incorrect Password!"})
    }
   }else{
     response.json({success: false, message:"User Not Found!"})
   }
   
})


module.exports = userRoutes;