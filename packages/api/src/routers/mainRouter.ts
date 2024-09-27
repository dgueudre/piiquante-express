import express from 'express';

import { notFound } from '../middlewares/notFound';
import { publicRouter } from './publicRouter';
import { securedRouter } from './securedRouter';

export const mainRouter = express
  .Router()
  .use('/api/auth', publicRouter)
  .use('/api/sauces', securedRouter)
  .use(notFound);
