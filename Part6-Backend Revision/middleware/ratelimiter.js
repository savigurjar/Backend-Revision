const redisClient = require("../config/redis");

const ratelimiter = async (req, res, next) => {
  const ip = req.ip;

  if (!ip) throw new Error("Ip aadress not found");

  const count = await redisClient.incr(ip);

  if (count > 60) res.status(404).send("Too many requests , please try again");

  if (count == 1) await redisClient.expire(3600);

  console.log(count);

  next();
};

module.exports = ratelimiter;
