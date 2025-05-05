import { Request, Response, NextFunction } from 'express';


export const userCheck = (req: Request, res: Response, next: NextFunction) => {
  const email = req.headers['email'] as string;
  if (!email) {
    return res.status(401).json({ message: 'Unauthorized: No email provided' });
  }
  req.user = { email };
  next();
};
