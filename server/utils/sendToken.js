const jwt = require('jsonwebtoken');

const sendToken = (email, message, statusCode, user, res) => {
// Generate a JWT token
const token = jwt.sign({ email}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });

//options for cookie
const cookieExpire = new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000));
const options = {
  expires: cookieExpire,
  httpOnly: true
};

res.status(statusCode).cookie("token", token, options).json({ message, token, userData:user });

}

module.exports = sendToken;