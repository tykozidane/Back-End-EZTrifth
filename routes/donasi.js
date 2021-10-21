const Donasi = require("../models/Donasi");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newDonasi = new Donasi(req.body);

  try {
    const savedDonasi = await newDonasi.save();
    res.status(200).json(savedDonasi);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Donasi.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Donasi user
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const donasis = await Donasi.find({ userId: req.params.userId });
    res.status(200).json(donasis);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL Donasi

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const donasis = await Donasi.find();
    res.status(200).json(donasis);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//   const productId = req.query.pid;
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: previousMonth },
//           ...(productId && {
//             products: { $elemMatch: { productId } },
//           }),
//         },
//       },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;