const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const postRoutes = require("./postRoutes")
const userRoutes = require("./userRoutes")

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use(postRoutes);
app.use(userRoutes)

app.listen(PORT, ()=>{
    connect.connectToServer();
    console.log(`server is running on port ${PORT}`)
})