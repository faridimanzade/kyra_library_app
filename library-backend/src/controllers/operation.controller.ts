import { Request, Response } from 'express';
import * as operationService from '../services/operation.service';

export const borrowBook = async (req: Request, res: Response) => {
  const email = req.user.email;
  const { bookId } = req.body;
  try {
    const response = await operationService.borrowBook(email, bookId);
    res.json(response);
  } catch (error: any) {
    console.error('Borrow book error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const email = req.user.email;
  const { bookId } = req.body;
  try {
    const response = await operationService.returnBook(email, bookId);
    res.json(response);
  } catch (error: any) {
    console.error('Return book error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};


export const returnBookEmail = async (req: Request, res: Response) => {
  const { bookId, email } = req.body;
  try {
    const response = await operationService.returnBookEmail(email, bookId);
    res.json(response);
  } catch (error: any) {
    console.error('Return book email error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};

export const buyBook = async (req: Request, res: Response) => {
  const email = req.user.email;
  const { count, bookId } = req.body;
  try {
    const response = await operationService.buyBook(email, bookId, count);
    res.status(200).json(response);
  } catch (error: any) {
    console.error('Buy book error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }

};

export const restockBook = async (req: Request, res: Response) => {
  const email = req.user.email;
  const { bookId } = req.body;
  try {
    const response = await operationService.restockBook(email, bookId);
    res.json(response);
  } catch (error: any) {
    console.error('Restock book error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};

export const getUserHistory = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const response = await operationService.getUserHistory(String(email || ''));
    if (!response || response.length === 0) {
      return res.status(404).json({ message: 'No history found' });
    }
    res.json(response);
  } catch (error: any) {
    console.error('User history error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};
