const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

const authMiddleware = (req, res, next) => {
  const tokenHeader = req.header("Authorization") || req.cookies.token;

  if (!tokenHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  let token;

  if (tokenHeader.includes("Bearer")) {
    token = tokenHeader.replace("Bearer ", "");
  } else {
    token = tokenHeader;
  }

  if (!token) {
    return res.status(401).send({ error: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
