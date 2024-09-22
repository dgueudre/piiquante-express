const express = require("express");
var path = require("path");
// var cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("./services/cors.js");
const router = require("./services/router.js");
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = require("./libs/dotenv.js");

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`)
  .then(() => console.log("mongo:ok"))
  .catch(() => console.log("mongo:ko"));

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors);
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", router);

module.exports = app;
