import express from 'express';

import SauceController from '../controllers/SauceController';
import UserController from '../controllers/UserController';
import { auth } from './auth';
import multer from './multer';

const router = express.Router();

router.post('/api/auth/signup', UserController.signup);
router.post('/api/auth/login', UserController.login);

router.get('/api/sauces', auth, SauceController.findAll);
router.get('/api/sauces/:id', auth, SauceController.findOneById);
router.post('/api/sauces', auth, multer, SauceController.create);
router.put('/api/sauces/:id', auth, multer, SauceController.update);
router.delete('/api/sauces/:id', auth, SauceController.remove);
router.post('/api/sauces/:id/like', auth, SauceController.like);

export default router;
