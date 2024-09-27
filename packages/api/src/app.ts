import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import { User } from '@piiquante/shared';

import { errorHandler } from './middlewares/errorHandler';
import { mainRouter } from './routers/mainRouter';
import { dbService } from './services/dbService';

dbService.connect();

export const app = express()
  .use(logger('dev'))
  .use(express.json())
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, '../public')))
  .use(mainRouter)
  .use(errorHandler);

let toto: User;
