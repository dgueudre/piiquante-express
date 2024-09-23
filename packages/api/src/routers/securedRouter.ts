import express from 'express';

import { sauceController } from '../controllers/sauceController';
import { multipart } from '../middlewares/multipart';

export const securedRouter = express
  .Router()
  .post('/sauces', multipart('sauce', 'image'), sauceController.create)
  .put('/sauces/:id', multipart('sauce', 'image'), sauceController.update)
  .delete('/sauces/:id', sauceController.remove)
  .post('/sauces/:id/like', sauceController.like);
