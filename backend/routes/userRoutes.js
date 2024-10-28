const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user 
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({
        name,
        email,
        password,  
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (password !== user.password) return res.status(401).json({ message: "Wrong Password" });

    const token = jwt.sign({ userId: user._id }, 'supersecretjwt', { expiresIn: '1h' });
    res.json({ token });
}); 

module.exports = router;

