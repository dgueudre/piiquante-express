import express from 'express';
import logger from 'morgan';
import path from 'path';

import { cors } from './services/cors';
import { dbService } from './services/dbService';
import router from './services/router';

dbService.connect();

export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors);
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);
