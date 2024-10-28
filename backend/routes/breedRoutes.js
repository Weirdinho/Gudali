const express = require('express');
const router = express.Router();
const Breed = require('../models/Breed');
const authMiddleware = require('../middleware/authMiddleware');
const {getBreeds, addBreed} = require("../controllers/breedController")

// Route to get all courses
router.get('/all-breeds', getBreeds);

// Purchase a course
router.post('/purchase/:courseId', authMiddleware, async (req, res) => {
    const { courseId } = req.params;
    const { userId, paymentMethod } = req.body;
    
    // Logic to handle payments and subscriptions
    res.json({ message: 'Course purchased successfully' });
});

router.post("/add", addBreed)

module.exports = router;