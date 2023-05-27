import { DecodedIdToken } from 'firebase-admin/auth';
import { Namespace, createNamespace } from 'cls-hooked';

const namespace: Namespace = createNamespace('app');

const set = (user: DecodedIdToken) => {
  if (namespace.active) {
    const session = namespace.get('session') || {};
    session['user'] = JSON.stringify(user);
    namespace.set('session', session);
  }
};

const get = () => {
  if (namespace.active) {
    const session = namespace.get('session') || {};
    const user = JSON.parse(session['user'] as string) as DecodedIdToken;
    console.log(`user get --> ${user} %c`, 'color:magenta');
    return user;
  }
  return undefined;
};

export const UserContextProvider = (middleware: any) => {
  return (req: any, res: any, next: any) => {
    namespace.run(() => {
      middleware(req, res, next);
    });
  };
};

export const UserContext = {
  get,
  set,
};
