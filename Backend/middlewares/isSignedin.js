const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied. No token provided!" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        if (decoded) {
            const VerifiedUser = await userModel.findOne({ _id: decoded.id })
            if (VerifiedUser) {
                req.user = decoded; // Attach user data to request
                next(); // Proceed to next middleware or route
            } else {
                return res.status(403).json({ message: "Invalid or expired token!", status: false });

            }
        } else {
            return res.status(403).json({ message: "Invalid or expired token!", status: false });

        }
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token!", status: false });
    }
};

module.exports = authMiddleware;
