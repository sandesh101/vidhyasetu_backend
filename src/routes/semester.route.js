import express from 'express';
import { createSemester } from '../controllers/semester.controller.js';
import { validateToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.route('/create').post(validateToken, createSemester);


export default router;