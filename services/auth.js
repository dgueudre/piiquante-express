const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  try {
    const [_, token] = req.headers.authorization.split` `;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
}

module.exports = { verifyToken };
