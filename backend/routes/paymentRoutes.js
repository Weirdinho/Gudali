const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
 
// Payment processing route
router.post('/pay', async (req, res) => {
    const { userId, courseId, paymentMethod } = req.body;
    
    const payment = new Payment({
        userId,
        courseId,
        paymentMethod,
    });

    try {
        await payment.save();
        res.json({ message: "Payment successful" });
    } catch (error) {
        res.status(500).json({ message: "Payment failed", error });
    }
});

module.exports = router;

