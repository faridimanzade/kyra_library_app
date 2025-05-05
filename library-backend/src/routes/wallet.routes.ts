// src/routes/wallet.routes.ts
import { Router } from 'express';
import { userCheck } from '../middlewares/userCheck.middleware';
import { adminCheck } from '../middlewares/adminCheck.middleware';
import * as walletController from '../controllers/wallet.controller';

const router = Router();

router.get('/', [userCheck, adminCheck], walletController.getWalletDetails);
router.get('/movements', [userCheck, adminCheck], walletController.getWalletMovements);

export default router;
