const redis = require("redis");
require("dotenv").config();
const redisClient = redis.createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-18789.c14.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 18789,
    connectTimeout: 80000,
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

module.exports = redisClient;
