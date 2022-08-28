const bcrypt = require("bcrypt");
const User = require("../models/User.js");

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
  return user;
}

module.exports = { signup, login };
