const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId
let postRoutes = express.Router();
const jwt = require("jsonwebtoken")
require("dotenv").config({path:"./config.env"})

//#1 - Retrieve All
//http://localhost:3000/posts

postRoutes.route("/posts").get(verifyToken, async(request, response)=>{
    let db = database.getDb();
    let data = await db.collection("posts").find({}).toArray()
    if(data.length>0){
        response.json(data)
    }else{
        throw new Error("Data was not found :(")
    }
})

//#2 - Retrieve One 
//http://localhost:3000/posts/12345

postRoutes.route("/posts/:id").get(verifyToken, async(request, response)=>{
    let db = database.getDb();
    let data = await db.collection("posts").findOne({_id:new ObjectId(request.params.id)})
    if(Object.keys(data).length>0){
        response.json(data)
    }else{
        throw new Error("Data was not found :(")
    }
})

//#3 - Create One 
//http://localhost:3000/posts

postRoutes.route("/posts").post(verifyToken, async(request, response)=>{
    let db = database.getDb();
    let mongoObject = {
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        author: request.body.author,
        dateCreated: request.body.dateCreated
    }
    let data = await db.collection("posts").insertOne(mongoObject)
   response.json(data)
})

//#4 - Update One 
//http://localhost:3000/posts

postRoutes.route("/posts/:id").put(verifyToken, async(request, response)=>{
    let db = database.getDb();
    let mongoObject = {
       $set:{
        title: request.body.title,
        description: request.body.description,
        content: request.body.content,
        author: request.body.author,
        dateCreated: request.body.dateCreated
       }
    }
    let data = await db.collection("posts").updateOne({_id:new ObjectId(request.params.id)},mongoObject)
   response.json(data)
})

//#5 - Delete One


postRoutes.route("/posts/:id").delete(verifyToken, async(request, response)=>{
    let db = database.getDb();
    let data = await db.collection("posts").deleteOne({_id:new ObjectId(request.params.id)})
    response.json(data)
})

// postRoutes.js - Fix the verifyToken middleware
function verifyToken(request, response, next) {
    const authHeaders = request.headers["authorization"] || request.headers["Authorization"];
    const token = authHeaders?.split(' ')[1];
    
    if (!token) {
        return response.status(401).json({ message: "Authentication Token is Missing" });
    }

    jwt.verify(token, process.env.SECRETKEY, (error, decoded) => {
        if (error) {
            return response.status(403).json({ message: "Invalid Token" });
        }
        // Fix: Attach to request object instead of body
        request.user = decoded;
        next();
    });
}

module.exports = postRoutes;