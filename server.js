////// DEPENDENCIES
const express = require("express")
const methodOverride = require("method-override")
const app = express()
require("dotenv").config()
const DATABASE_URL = process.env.DATABASE_URL
const Products = require("./models/products.js")
const seedData = require("./models/seedData.js")
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
// root & seed
app.get("/", (req, res)=> res.send("<a href='/products'>Go to Products</a>"))
app.get("/products/seed", (req, res)=>{
    Products.deleteMany({}, (error, allProducts)=>{})
    Products.create(seedData, (error, data)=>{
        res.redirect("/products")
    })
})

// Index
app.get("/products", (req, res)=>{
    Products.find({}, (error, allProducts)=>{
        res.render("index.ejs", {
            allProducts: allProducts,
        })
    })
})

// New
app.get("/products/new", (req, res)=>{
    res.render("new.ejs")
})
// Destroy
app.delete("/products/:id", (req, res)=>{
    Products.findByIdAndDelete(req.params.id, (error, foundProduct)=>{
        res.redirect("/products")
    })
})

// Update
// Create
app.post("/products", (req, res)=>{
    Products.create(req.body, (error, newProduct)=>{
        res.redirect("/products")
    })
})

// Edit 
// ///////////////I attemted to do this by memory, but couldn't make it work and ran out of time. 
// app.put("/products/:id", (req, res)=>{
//     Products.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new:true},
//         (error, updatedItem) =>{
//             res.render("edit.ejs")
//         }
//     )
// })

// Show
app.get("/products/:id", (req, res)=>{
    Products.findById(req.params.id, (error, foundProduct) =>{
        res.render("show.ejs", {
            showProduct: foundProduct,
        })
    })
})

////// LISTENER
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log("connected on port", PORT))