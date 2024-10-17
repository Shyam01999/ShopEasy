const jwt = require('jsonwebtoken');
const db = require("../models/index");
const User = db.User;

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log("token", token);
        if (!token) {
            return res.json({ message: "Please Login to access this resource" })
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findOne({ where: { email: decodedData.email } });

        if (!req.user) {
            return res.json({ message: "User not found" });
        }
        // If the user is authenticated, call next() to proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        console.log(error);
    }
}

const authorizeRole = (...roles) => async (req, res, next) => {
    try {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role: ${req.user.role} is not allowed to access this resource.` })
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    isAuthenticated,
    authorizeRole
};