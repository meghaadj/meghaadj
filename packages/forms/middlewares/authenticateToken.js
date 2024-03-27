import jwt from "jsonwebtoken";

import config from "../config.js";

const MS_TO_SECONDS_RATIO = 1000;

// middleware function that verifies the jwt token passed in a request
// after verifying, sets req.user to be user object that was decoded in token
const authenticateToken = (req, res, next) => {
  try {
    const token = req.header("x-jwt-token");

    if (!token) {
      req.user = null;
      return next();
    }

    const secret = config.jwtSecretKey;
    const decoded = jwt.verify(token, secret);

    if (decoded.exp < Date.now() / MS_TO_SECONDS_RATIO) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default authenticateToken;
