import { Request, Response, NextFunction } from 'express';

export const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  const email = req.user.email;
  if (email !== (process.env.ADMIN_EMAIL || 'admin@dummy-library.com')) {
    return res.status(403).json({ message: 'Forbidden: Admin access only' });
  }
  next();
};
