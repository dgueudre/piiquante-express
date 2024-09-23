import express from 'express';

import { sauceController } from '../controllers/sauceController';
import { userController } from '../controllers/userController';
import { jwtGuard } from '../middlewares/jwtGuard';
import multer from './multer';

const router = express.Router();

router.post('/api/auth/signup', userController.signup);
router.post('/api/auth/login', userController.login);

router.get('/api/sauces', jwtGuard, sauceController.findAll);
router.get('/api/sauces/:id', jwtGuard, sauceController.findOneById);
router.post('/api/sauces', jwtGuard, multer, sauceController.create);
router.put('/api/sauces/:id', jwtGuard, multer, sauceController.update);
router.delete('/api/sauces/:id', jwtGuard, sauceController.remove);
router.post('/api/sauces/:id/like', jwtGuard, sauceController.like);

export default router;
