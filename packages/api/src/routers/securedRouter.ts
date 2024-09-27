import express from 'express';

import { sauceController } from '../controllers/sauceController';
import { jwtGuard } from '../middlewares/jwtGuard';
import { multipart } from '../middlewares/multipart';

export const securedRouter = express
  .Router()
  .use(jwtGuard)
  .get('/', sauceController.findAll)
  .get('/:id', sauceController.findOneById)
  .put('/:id', multipart('sauce', 'image'), sauceController.update)
  .post('', multipart('sauce', 'image'), sauceController.create)
  .delete('/:id', sauceController.remove)
  .post('/:id/like', sauceController.like);
