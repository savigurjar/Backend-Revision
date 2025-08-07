// middleware, authentication
const Auth = (req, res, next) => {
  const token = "ABCEF";
  const Access = token === "ABCEF" ? 1 : 0;
  if (!Access) {
    res.status(403).send("no permission");
  }
  next();
};
module.exports = Auth;
