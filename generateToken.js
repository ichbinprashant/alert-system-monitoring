// generateToken.js - Script to generate a JWT token
const { generateToken } = require('./utils/jwtService'); // Adjust the path if necessary

const userId = '12345'; // Replace with your custom user ID or payload
const token = generateToken(userId);

// Print the token
console.log(`Generated Token: ${token}`);
