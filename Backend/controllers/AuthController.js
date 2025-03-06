const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()
// ✅ Sign Up
const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use!" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            type: 'Admin',
            house: [] // Default empty house array
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT, { expiresIn: "7d" });

        // Set token in cookie
        res.cookie("token", token);

        res.status(201).json({ message: "User registered successfully!", user: newUser, token });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Sign In
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "7d" });

        // Set cookie with token
        res.cookie("token", token);

        res.status(200).json({ message: "Login successful!", user, token, success: true });
    } catch (error) {
        console.error("Signin error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Sign Out
const signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully!" });
};


const authorize = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(403).json({ message: "Access denied. No token provided!" });
        } else {
            const user = await User.findOne({ _id: id }).select("-password")
            if (user && user._id) {
                return res.status(200).json({ message: "User authenticated successfully!", user, status: true })
            } else {
                return res.status(403).json({ message: "Access denied. User not found!", status: false })
            }
        }
    } catch (error) {
        console.error("Auth error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { signup, signin, signout, authorize };
