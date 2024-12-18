const redis = require('redis');

const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Error:', err));

module.exports = redisClient;
