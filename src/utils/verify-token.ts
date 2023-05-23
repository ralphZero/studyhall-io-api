import { NextFunction, Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import app from '../utils/firebase-app';
import { checkWhitelist } from './check-whitelist';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).send({ success: false, message: 'Bad request' });
    return;
  }

  try {
    const result = await getAuth(app).verifyIdToken(token);
    if (result) {
      checkWhitelist(result, next, ({ code, message }) => {
        res.status(code).send({ success: false, message });
        return;
      });
    } else {
      res.status(401).send({ success: false, message: 'Unauthorized access' });
      return;
    }
  } catch (e) {
    res.status(401).send({ success: false, message: 'Unauthorized access' });
    return;
  }
};
