const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndUsername,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

// router.post("/", verifyToken, async (req, res) => {
//   const newCart = new Cart(req.body);

//   try {
//     const savedCart = await newCart.save();
//     res.status(200).json(savedCart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//UPDATE
// Update Add Product
router.put("/add/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const getCart = await Cart.findOne({userId: req.params.userId});
    const updatedCart = await Cart.findByIdAndUpdate(
      getCart._id,
      {
        $push: { 
            products: req.body.productId,
        }
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Update Delete Product
router.put("/delete/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const getCart = await Cart.findOne({userId: req.params.userId});
      const updatedCart = await Cart.findByIdAndUpdate(
        getCart._id,
        {
          $pull: { 
              products: req.body.productId,
          }
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//DELETE
// router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     res.status(200).json("Cart has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET USER CART
router.get("/find/:userid", verifyToken, async (req, res) => {
  try {
    // const user = await User.findOne({username: req.params.username});
    const cart = await Cart.findOne({ userId : req.params.userid});
    const productnya = await Product.find({ _id: { $in: cart.products } });
    if(req.user.id === cart.userId){
      res.status(200).json(productnya);
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
    
    // const test = cart.products;
    // if(cart){
    //   const cekProduct = cart.products.forEach(function(productId){
    //   var searchProduct = Product.get(productId);
    //   if (searchProduct.status == "sold"){
    //     var updatedCart = Cart.findByIdAndUpdate(
    //       cart._id,
    //       {
    //         $pull: { 
    //             products: {
    //               "productId" : productId,
    //               } 
    //         }
    //       },
    //       { new: true }
    //     );
    //   }
    //   sum = sum+1;
    // });
    // }
    
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.status(200).json(carts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;