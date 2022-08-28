const Sauce = require("../models/Sauce.js");

async function findAll() {
  const result = await Sauce.find();
  return [200, result];
}

async function findOneById(id) {
  const result = await Sauce.findOne({ _id: id });
  return [200, result];
}

async function create(rawSauce) {
  delete rawSauce._id;
  const sauce = new Sauce({
    ...rawSauce,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  const result = await sauce.save();
  return [201, { message: "Sauce created" }];
}

module.exports = { findAll, findOneById, create };
