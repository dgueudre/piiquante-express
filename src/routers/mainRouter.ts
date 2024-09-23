import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard';
import { publicRouter } from './publicRouter';
import { securedRouter } from './securedRouter';

export const mainRouter = express
  .Router()
  .use(publicRouter)
  .use(jwtGuard, securedRouter);
