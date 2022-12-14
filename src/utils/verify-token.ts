import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import app from '../utils/firebase-app';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send({ success: false, message: "Unauthorized access" })
        return;
    }

    const result = await getAuth(app).verifyIdToken(token)
        .catch(err => {
            return null;
        });

    if (result)
        next();
    else
        res.status(401).send({ success: false, message: "Unauthorized access"  })
    return;
}