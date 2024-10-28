const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authMiddleware = require('../middleware/authMiddleware');
const {getCourses, addCourse} = require("../controllers/courseController")

// Route to get all courses
router.get('/all-courses', getCourses);

// Purchase a course
router.post('/purchase/:courseId', authMiddleware, async (req, res) => {
    const { courseId } = req.params;
    const { userId, paymentMethod } = req.body;
    
    // Logic to handle payments and subscriptions
    res.json({ message: 'Course purchased successfully' });
});



router.post("/add", addCourse)

module.exports = router;
