const express = require("express");
const auth = require("./auth.js");
const multer = require("./multer.js");
const UserController = require("../controllers/UserController.js");
const SauceController = require("../controllers/SauceController.js");
const safe = require("./safe.js");

const router = express.Router();

function defaultAction(req, res, next) {
  res.json({ message: "INPROGESS" });
}

router.post("/api/auth/signup", safe(UserController.signup));
router.post("/api/auth/login", safe(UserController.login));

router.get("/api/sauces", auth.verifyToken, SauceController.findAll);
router.get("/api/sauces/:id", auth.verifyToken, SauceController.findOneById);
router.post("/api/sauces", auth.verifyToken, multer, SauceController.create);
router.put("/api/sauces/:id", auth.verifyToken, multer, SauceController.update);
router.delete("/api/sauces/:id", auth.verifyToken, SauceController.remove);
router.post("/api/sauces/:id/like", auth.verifyToken, defaultAction);

module.exports = router;
