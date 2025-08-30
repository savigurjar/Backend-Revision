const redis = require("redis");
require("dotenv").config();


const redisClient = redis.createClient({
    username: "default",
  password: "owq8uGRyxlbldr31F6jPRvXaYOyIcKWa",
  socket: {
    host: "redis-18789.c14.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 18789,
  },
});



redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;
