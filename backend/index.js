require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const { uesrRouter } = require('./router/User')
const cookieParser = require("cookie-parser")
const { productRouter } = require('./router/Product')
const cors = require("cors")
const app = express()
const path = require("path")


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.static(path.join(__dirname, "frontend", "dist")))
app.get("/",(req, res)=>{
    res.send("Hello world")
})
app.use("/v1/api/user",uesrRouter)
app.use("/v1/api/product", productRouter)
app.get("*",(req, res) =>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})
const Main =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Databse Connected")
        app.listen(process.env.PORT || 3000)
        console.log("App listing on port 3000")

    }catch(err){
        console.error(err)
    }
}
Main()