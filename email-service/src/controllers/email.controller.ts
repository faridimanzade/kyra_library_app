import { Request, Response } from 'express';
import * as emailService from '../services/email.service';

export const sendEmail = async (req: Request, res: Response) => {
  const { to, subject, message } = req.body;
  try {
    const result = await emailService.sendEmail(String(to || ''), String(subject || ''), String(message || ''));
    res.status(200).json('Email sent successfully');
  } catch (error: any) {
    console.error('Email sent error:', error);

    const message = error.message || 'Internal server error';

    res.status(400).json({ error: message });
  }
};
