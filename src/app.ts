import express from 'express';
import mongoose from 'mongoose';
// var cookieParser = require("cookie-parser");
import logger from 'morgan';

import { DB_HOST, DB_NAME, DB_USER, DB_PASS } from './libs/dotenv';
import cors from './services/cors';
import router from './services/router';

var path = require('path');

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`)
  .then(() => console.log('mongo:ok'))
  .catch(() => console.log('mongo:ko'));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors);
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);

export default app;
