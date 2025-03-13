import express from 'express';
import { createSemester, getSemester, deleteSemester, updateSemester } from '../controllers/semester.controller.js';
import { validateToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.route('/create').post(validateToken, createSemester);
router.route('/get-semester/:collegeId').get(validateToken, getSemester);
router.route('/update/:id').put(validateToken, updateSemester);
router.route('/delete/:id').delete(validateToken, deleteSemester);


export default router;