////// DEPENDENCIES
const express = require("express")
const methodOverride = require("method-override")
const app = express()
require("dotenv").config()
const DATABASE_URL = process.env.DATABASE_URL
const mongoose = require("mongoose")
const DB = mongoose.connection
// Connect to Database
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// error and success messages
DB.on("error", (err)=> console.log(err.message + ": is mongoose up?"))
DB.on("connected", () => console.log("Mongoose connected"))
DB.on("disconnected", ()=> console.log("Mongoose disconnected"))
////// MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
////// ROUTES
app.get("/", (req, res)=> res.send("it's working"))
////// LISTENER
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log("connected on port", PORT))