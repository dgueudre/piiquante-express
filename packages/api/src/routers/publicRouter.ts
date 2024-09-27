import express from 'express';

import { userController } from '../controllers/userController';

export const publicRouter = express
  .Router()
  .post('/signup', userController.signup)
  .post('/login', userController.login);
