import { NextFunction, Response, Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import app from '../utils/firebase-app';
import { checkWhitelist } from './check-whitelist';
import { isDevelop, isLocal, isProd } from './environment';
import { DevDecodedIdToken } from './dev-user';
import { UserContext, UserContextProvider } from './user-context';

export const verifyToken = UserContextProvider(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const devAuthKey = req.headers['x-hallify-dev-token'] as string | undefined;

    if (!token && isProd()) {
      res.status(400).send({ success: false, message: 'Bad request' });
      return;
    }

    if ((isLocal() || isDevelop()) && !token && !!devAuthKey) {
      if (devAuthKey !== process.env.HALLIFY_API_KEY) {
        res
          .status(401)
          .send({ success: false, message: 'Unauthorized access' });
        return;
      } else {
        const whiteList = JSON.parse(
          process.env.IAM_WHITELIST as string
        ) as Array<{ email: string; uid: string }>;

        const user = DevDecodedIdToken(whiteList[0]);
        UserContext.set(user);
        next();
        return;
      }
    }

    try {
      const result = await getAuth(app).verifyIdToken(token as string);
      if (result) {
        checkWhitelist(
          result,
          () => {
            UserContext.set(result);
            next();
          },
          ({ code, message }) => {
            res.status(code).send({ success: false, message });
            return;
          }
        );
      } else {
        res
          .status(401)
          .send({ success: false, message: 'Unauthorized access' });
        return;
      }
    } catch (e) {
      res.status(401).send({ success: false, message: 'Unauthorized access' });
      return;
    }
  }
);
