import express from 'express';
import logger from 'morgan';
import path from 'path';

import { errorHandler } from './middlewares/errorHandler';
import { mainRouter } from './routers/mainRouter';
import { cors } from './services/cors';
import { dbService } from './services/dbService';

dbService.connect();

export const app = express()
  .use(logger('dev'))
  .use(express.json())
  .use(cors)
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, '../public')))
  .use(mainRouter)
  .use(errorHandler);
