import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { adminCheck } from '../middlewares/adminCheck.middleware';
import { userCheck } from '../middlewares/userCheck.middleware';

const router = Router();


router.get('/search', [userCheck, adminCheck], bookController.searchBooks);
router.get('/details/:id', [userCheck, adminCheck], bookController.getBookDetails);
router.get('/actions', [userCheck, adminCheck], bookController.getBookActions);

export default router;
