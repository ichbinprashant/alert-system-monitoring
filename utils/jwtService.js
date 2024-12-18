const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Generate a token for testing (use this function in an auth system later)
const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

// Verify the token in incoming requests
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };