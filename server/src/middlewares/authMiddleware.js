const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");
const User = require("../models/User");

exports.routeGuard = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, SECRET);

      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      res.status(401).json("Not Authorized");
    }
  } else {
    res.status(401).json("Not authorized no token");
  }
};


