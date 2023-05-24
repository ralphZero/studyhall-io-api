import { isDevelop } from './environment';
import { DecodedIdToken } from 'firebase-admin/auth';

interface CallBackError {
  message: string;
  code: number;
}

export const checkWhitelist = (
  result: DecodedIdToken,
  next: () => void,
  errorCallback: (error: CallBackError) => void
) => {
  if (isDevelop()) {
    const whiteList = JSON.parse(process.env.IAM_WHITELIST as string);

    if (Array.isArray(whiteList)) {
      const index = (
        whiteList as Array<{ email: string; uid: string }>
      ).findIndex(
        (entry) => entry.email === result.email && entry.uid === result.uid
      );

      if (index !== -1) {
        next();
      } else {
        errorCallback({ code: 401, message: 'Unauthorized access' });
        return;
      }
    } else {
      errorCallback({ code: 500, message: 'Internal server error' });
      return;
    }
  } else {
    next();
  }
};
