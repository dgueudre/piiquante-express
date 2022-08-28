const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User.js");

dotenv.config();
const { JWT_SECRET } = process.env;

async function signup(email, rawPassword) {
  const password = await bcrypt.hash(rawPassword, 10);
  try {
    const user = new User({ email, password });
    await user.save();
    return [201, { message: "User created" }];
  } catch (error) {
    return [400, { message: `Email ${email} already use` }];
  }
}

async function login(email, rawPassword) {
  const user = await User.findOne({ email });
  if (!user) {
    return [401, { message: "Invalid credentials" }];
  }
  const valid = await bcrypt.compare(rawPassword, user.password);
  if (!valid) {
    return [401, { message: "Invalid credentials" }];
  }
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
  return [200, { userId, token }];
}

module.exports = { signup, login };
