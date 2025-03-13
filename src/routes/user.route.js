import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/checkToken.middleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(authMiddleware, logoutUser);


export default router;