////// DEPENDENCIES
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const storeController = require("./controllers/store.js")
const app = express()
require("dotenv").config()
const DATABASE_URL = process.env.DATABASE_URL
const DB = mongoose.connection

// Database Config
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
app.use("/products", storeController)
app.use(express.static("public"))

////// LISTENER
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log("connected on port", PORT))