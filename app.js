const express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./services/router.js");

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`)
  .then(() => console.log("mongo:ok"))
  .catch(() => console.log("mongo:ko"));

var app = express();

app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", router);

module.exports = app;
