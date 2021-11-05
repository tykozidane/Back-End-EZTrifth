const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {type: String, required:true, unique:true},
    products: {type: Array},
},{ timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);