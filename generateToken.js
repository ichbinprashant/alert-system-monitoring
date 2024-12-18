// generate a JWT token
const { generateToken } = require('./utils/jwtService'); 

const userId = '12345'; // Replace with your custom user ID or payload
const token = generateToken(userId);


console.log(`Generated Token: ${token}`);
