import express from 'express';

import { sauceController } from '../controllers/sauceController';
import { upload } from '../middlewares/upload';

export const securedRouter = express
  .Router()
  .post('/api/sauces', upload.single('image'), sauceController.create)
  .put('/api/sauces/:id', upload.single('image'), sauceController.update)
  .delete('/api/sauces/:id', sauceController.remove)
  .post('/api/sauces/:id/like', sauceController.like);
