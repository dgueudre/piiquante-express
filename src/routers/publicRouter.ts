import express from 'express';

import { sauceController } from '../controllers/sauceController';
import { userController } from '../controllers/userController';

export const publicRouter = express
  .Router()
  .post('/api/auth/signup', userController.signup)
  .post('/api/auth/login', userController.login)
  .get('/api/sauces', sauceController.findAll)
  .get('/api/sauces/:id', sauceController.findOneById);
