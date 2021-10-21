const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    status: { type: String, default: "pending"}
    
  },
  { timestamps: true }
);


ProductSchema.statics = {
  /**
   * Find project by _id
   *
   * @param {ObjectId} _id
   * @api private
   */

  get: function (_id) {
      return this.findOne({
              _id
          })
          .exec();
  }
}

module.exports = mongoose.model("Product", ProductSchema);