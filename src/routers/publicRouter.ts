import express from 'express';

import { sauceController } from '../controllers/sauceController';
import { userController } from '../controllers/userController';

export const publicRouter = express
  .Router()
  .post('/auth/signup', userController.signup)
  .post('/auth/login', userController.login)
  .get('/sauces', sauceController.findAll)
  .get('/sauces/:id', sauceController.findOneById);
