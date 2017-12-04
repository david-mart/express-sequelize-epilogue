import express from 'express';
import authController from './controllers/auth.controller';

const router = express.Router();

router.route('/auth').post(authController.post);
export default router;
