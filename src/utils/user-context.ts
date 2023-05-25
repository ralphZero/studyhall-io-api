import { DecodedIdToken } from 'firebase-admin/auth';
import { createNamespace, getNamespace } from 'continuation-local-storage';

export default class UserContext {
  static set = (user: DecodedIdToken) => {
    const session = createNamespace('user_ctx');
    session.set<DecodedIdToken>('user', user);
  };

  static get = () => {
    const session = getNamespace('user_ctx');
    return session?.get<DecodedIdToken>('user');
  };
}
