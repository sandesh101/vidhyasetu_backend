import express from 'express';
import { createCollege, deleteCollege, getAllColleges, updateColelge } from '../controllers/college.controller.js';
import { validateToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.route('/').get(validateToken, getAllColleges);
router.route('/create').post(validateToken, createCollege);
router.route('/delete/:id').delete(validateToken, deleteCollege);
router.route('/update/:id').put(validateToken, updateColelge);

export default router;