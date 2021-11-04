const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    nama: {type: String, required: true},
    products: [
        {
            productId:{type: String,},
        },
    ],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    notelp: {type: String, required: true},
    img: {type: String, required: true},
    status: {type: String, default: "pending"},
    
},{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema);