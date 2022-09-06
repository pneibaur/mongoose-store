const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String},
    price: {type: Number, min: [0, "Can't be negative"]},
    qty: {type: Number},
})

const Products = mongoose.model("Products", productSchema)
module.exports = Products