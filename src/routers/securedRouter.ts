import express from 'express';

import { sauceController } from '../controllers/sauceController';
import { multipart } from '../middlewares/multipart';
import { upload } from '../middlewares/upload';

export const securedRouter = express
  .Router()
  .post(
    '/api/sauces',
    upload.single('image'),
    multipart.toJson('sauce'),
    sauceController.create
  )
  .put(
    '/api/sauces/:id',
    upload.single('image'),
    multipart.toJson('sauce'),
    sauceController.update
  )
  .delete('/api/sauces/:id', sauceController.remove)
  .post('/api/sauces/:id/like', sauceController.like);
