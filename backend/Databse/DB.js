const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        unique: true,
        required: true
    },
    name: String,
    password: String,
    assignTeam: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})
const ProductSchema = new mongoose.Schema({
    name: {
        type: String, required: String, unique: true
    },
    description: String,
    price: String,
    imageUrl: String
})

const User = mongoose.model("User",UserSchema)
const Product = mongoose.model("Product", ProductSchema)
module.exports = {
    User,
    Product
}