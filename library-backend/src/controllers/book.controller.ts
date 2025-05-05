import { Request, Response } from 'express';
import * as bookService from '../services/book.service';

export const searchBooks = async (req: Request, res: Response) => {
  const { searchParam } = req.query;
  try {
    const result = await bookService.searchBooks(String(searchParam || ''));
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }
    res.json(result);
  } catch (error: any) {
    console.error('Search book error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};

export const getBookDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookDetails(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error: any) {
    console.error('Detail book error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};

export const getBookActions = async (req: Request, res: Response) => {
  const { id, type, email } = req.query;
  try {
    const actions = await bookService.getBookActions(String(id || ''), String(type || ''), String(email || ''));
    if (!actions || actions.length === 0) {
      return res.status(404).json({ message: 'No actions found' });
    }
    res.json(actions);
  } catch (error: any) {
    console.error('Book action error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};
