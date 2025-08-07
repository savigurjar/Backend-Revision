const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const User = require("../models/user");
const userAuth = async (req,res,next)=>{
   const {token} = req.cookies;
   const payload = jwt.verify(token,"savi@1!hsd");
   if(!token) throw new Error("missing token");
  
   const _id = payload;
   if(!_id) throw new Error("id not found");

   const result = await User.findById(_id);
   if (!result) {
      return res.status(404).send("User not found");
    }
    req.result = result;
    next();
}
module.exports = userAuth;