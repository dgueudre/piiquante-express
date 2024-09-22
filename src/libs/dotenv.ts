const dotenv = require("dotenv");

dotenv.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, JWT_SECRET } = process.env;

module.exports = { DB_HOST, DB_NAME, DB_USER, DB_PASS, JWT_SECRET };
