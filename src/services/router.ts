import express from 'express';

import SauceController from '../controllers/SauceController';
import UserController from '../controllers/UserController';
import { jwtGuard } from '../middlewares/jwtGuard';
import multer from './multer';

const router = express.Router();

router.post('/api/auth/signup', UserController.signup);
router.post('/api/auth/login', UserController.login);

router.get('/api/sauces', jwtGuard, SauceController.findAll);
router.get('/api/sauces/:id', jwtGuard, SauceController.findOneById);
router.post('/api/sauces', jwtGuard, multer, SauceController.create);
router.put('/api/sauces/:id', jwtGuard, multer, SauceController.update);
router.delete('/api/sauces/:id', jwtGuard, SauceController.remove);
router.post('/api/sauces/:id/like', jwtGuard, SauceController.like);

export default router;
