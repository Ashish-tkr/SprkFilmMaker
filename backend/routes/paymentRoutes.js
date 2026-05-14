const express = require("express");

const router = express.Router();

const razorpay = require("../config/razorpay");


// ======================================
// CREATE RAZORPAY ORDER
// ======================================

router.post("/create-order", async (req, res) => {

  try {

    const options = {

      amount: 500 * 100, // ₹500

      currency: "INR",

      receipt: "receipt_order"

    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});

module.exports = router;