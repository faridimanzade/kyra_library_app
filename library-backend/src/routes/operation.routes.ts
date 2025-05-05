import { Router } from 'express';
import * as operationController from '../controllers/operation.controller';
import { userCheck } from '../middlewares/userCheck.middleware';
import { adminCheck } from '../middlewares/adminCheck.middleware';

const router = Router();

router.post('/borrow', [userCheck], operationController.borrowBook);
router.post('/return', [userCheck], operationController.returnBook);
router.post('/buy', [userCheck], operationController.buyBook);
router.post('/restock', [userCheck, adminCheck], operationController.restockBook);
router.post('/sendEmail', [userCheck, adminCheck], operationController.returnBookEmail);
router.get('/history', [userCheck, adminCheck], operationController.getUserHistory);

export default router;
