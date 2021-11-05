const mongoose = require("mongoose")

const donasiSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    products: {type: Array},
    amount: {type: Number, required: true},
    img: {type: String, required: true},
    status: {type: String, default: "pending"},
    
},{ timestamps: true });

module.exports = mongoose.model("Donasi", donasiSchema);