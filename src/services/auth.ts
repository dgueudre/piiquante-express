const jwt = require("jsonwebtoken");
const safe = require("./safe");

const { JWT_SECRET } = require("../libs/dotenv.js");

function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new jwt.JsonWebTokenError();
    }
    const [_, token] = req.headers.authorization.split` `;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { userId } = decodedToken;
    req.auth = { userId };
    next();
  } catch (error) {
    if (["TokenExpiredError", "JsonWebTokenError"].includes(error.name)) {
      return res
        .status(401)
        .json({ message: "Must be logged in to access this resource." });
    }
    throw error;
  }
}

module.exports = safe(auth);
