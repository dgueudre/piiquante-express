import express from 'express';

import { jwtGuard } from '../middlewares/jwtGuard';
import { notFound } from '../middlewares/notFound';
import { publicRouter } from './publicRouter';
import { securedRouter } from './securedRouter';

export const mainRouter = express
  .Router()
  .use('/api', publicRouter)
  .use('/admin', jwtGuard, securedRouter)
  .use(notFound);
