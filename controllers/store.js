const express = require("express");
const storeRouter = express.Router();
const Products = require("../models/products.js");


////// ROUTES
// root & seed ------- COMMENTING OUT as I currently don't want to go to this route right now. 
// const seedData = require("./models/seedData.js")
// app.get("/products/seed", (req, res)=>{
//     Products.deleteMany({}, (error, allProducts)=>{})
//     Products.create(seedData, (error, data)=>{
//         res.redirect("/products")
//     })
// })

// Index
storeRouter.get("/", (req, res)=>{
    Products.find({}, (error, allProducts)=>{
        res.render("index.ejs", {
            allProducts: allProducts,
            tabTitle: "All Items"
        })
    })
})

// New
storeRouter.get("/new", (req, res)=>{
    res.render("new.ejs", {
        tabTitle: "New Item"
    })
})
// Destroy
storeRouter.delete("/:id", (req, res)=>{
    Products.findByIdAndDelete(req.params.id, (error, foundProduct)=>{
        res.redirect("/products")
    })
})  

// Update
storeRouter.put("/:id", (req, res)=>{
    Products.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
        (error, updatedItem) =>{
            res.redirect(`/products/${req.params.id}`)
        }
    )
})
storeRouter.put("/:id/buy", (req, res) =>{
    Products.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
        (error, updatedItem) =>{
            console.log(updatedItem.qty)
            updatedItem.qty -= 1
            updatedItem.save()
            console.log(`new update: ${updatedItem.qty}`)
            res.redirect(`/products/${req.params.id}`)
        }
    )
})
// Create
storeRouter.post("/", (req, res)=>{
    Products.create(req.body, (error, newProduct)=>{
        res.redirect("/products")
    })
})

// Edit 
storeRouter.get("/:id/edit", (req, res)=>{
    Products.findById(req.params.id, (error, foundItem)=>{
        res.render("edit.ejs", {
            item: foundItem,
            tabTitle: "Edit Item",
        })
    })
})
// Show
storeRouter.get("/:id", (req, res)=>{
    Products.findById(req.params.id, (error, foundProduct) =>{
        res.render("show.ejs", {
            showProduct: foundProduct,
            tabTitle: "Item View",
        })
    })
})

module.exports = storeRouter