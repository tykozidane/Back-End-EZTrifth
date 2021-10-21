const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    const cekemail = await User.findOne({ email: req.body.email });
    if (!cekemail) {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
      });

      try {
        const savedUser = await newUser.save();
        const user = await User.findOne({ username: newUser.username });
        const newCart = new Cart({
          userId: user._id,
          product: [""],
        });
        const savedCart = await newCart.save();
        res.status(201).json(savedUser, savedCart);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(400).send({ message: "Email sudah dipakai!!!" });
    }
  } else {
    res.status(400).send({ message: "Username sudah dipakai!!!" });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("data ga ada");

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password && res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
