const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    namalengkap: { type: String, default: " " },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    notelp: { type: String, default: " " },
    kota: { type: String, default: " " },
    provinsi: { type: String, default: " " },
    alamat: { type: String, default: " " },
    img: { type: String, default: " " },
    ktp: { type: String, default: " " },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
