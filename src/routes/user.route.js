import express from 'express';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/checkToken.middleware.js';
import { validateToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(authMiddleware, logoutUser);
router.route('/').get(validateToken, getCurrentUser);


export default router;