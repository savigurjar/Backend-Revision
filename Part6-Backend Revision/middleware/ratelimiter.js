const redisClient = require("../config/redis");
const crypto = require("crypto");

const windowSize = 3600;
const maxRequest = 60;

const ratelimiter = async (req, res, next) => {
  try {
    const key = `IP${req.ip}`; //::1p me ip  ko store kr rha tha

    const currentTime = Date.now() / 1000;
    console.log("cuurent time", currentTime);
    const windowTime = currentTime - windowSize;
    console.log("window time", windowTime);

    // Remove old entries
    await redisClient.zRemRangeByScore(key, 0, windowTime);

    const numOfRequest = await redisClient.zCard(key);
    if (numOfRequest >= maxRequest)
      throw new Error("Number of requests exceeded");

    // Add request with secure unique value
    const secureRandom = crypto.randomBytes(8).toString("hex"); // 16-char secure random
    await redisClient.zAdd(key, [
      { score: currentTime, value: `${currentTime}:${secureRandom}` },
    ]);

    console.log(secureRandom);

    // Ensure key expires
    await redisClient.expire(key, windowSize);

    console.log(numOfRequest);

    next();
  } catch (err) {
    res.status(401).send("error " + err);
  }
};

module.exports = ratelimiter;
