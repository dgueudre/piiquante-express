const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User.js");

dotenv.config();
const { JWT_SECRET } = process.env;

async function signup(email, rawPassword) {
  const password = await bcrypt.hash(rawPassword, 10);
  const user = new User({ email, password });
  const result = await user.save();
  return result;
}

async function login(email, rawPassword) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("invalid creds");
  }
  const valid = await bcrypt.compare(rawPassword, user.password);
  if (!valid) {
    throw new Error("invalid creds");
  }
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
  const result = { userId, token };
  return result;
}

module.exports = { signup, login };
