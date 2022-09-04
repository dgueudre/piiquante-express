const express = require("express");
const auth = require("./auth.js");
const multer = require("./multer.js");
const UserController = require("../controllers/UserController.js");
const SauceController = require("../controllers/SauceController.js");

const router = express.Router();

router.post("/api/auth/signup", UserController.signup);
router.post("/api/auth/login", UserController.login);

router.get("/api/sauces", auth, SauceController.findAll);
router.get("/api/sauces/:id", auth, SauceController.findOneById);
router.post("/api/sauces", auth, multer, SauceController.create);
router.put("/api/sauces/:id", auth, multer, SauceController.update);
router.delete("/api/sauces/:id", auth, SauceController.remove);
router.post("/api/sauces/:id/like", auth, SauceController.like);

module.exports = router;
