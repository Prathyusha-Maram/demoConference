const jwt = require("jsonwebtoken");
const config = require("../config");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      res.json({ message: "Authentication failed", status: false });
    } else {
      const decode = jwt.verify(token, config.JWT_TOKEN_KEY, null);
      req.data = decode;
      next();
    }
  } catch (error) {
    res.json({ message: "Authentication failed", status: false });
  }
};

module.exports = authentication;
