import { Request, Response } from 'express';
import * as walletService from '../services/wallet.service';

export const getWalletDetails = async (req: Request, res: Response) => {
  try {
    const wallet = await walletService.getWalletInfo();
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    res.json(wallet);
  } catch (error: any) {
    console.error('Detail wallet error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};

export const getWalletMovements = async (req: Request, res: Response) => {
  const { type } = req.query;
  try {
    const movements = await walletService.getWalletMovements(String(type || ''));
    if (!movements || movements.length === 0) {
      return res.status(404).json({ message: 'No movements found' });
    }
    res.json(movements);
  } catch (error: any) {
    console.error('Movements wallet error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};

