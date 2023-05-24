import { DecodedIdToken } from 'firebase-admin/auth';

export default class UserContext {
  static _bindings = new WeakMap<DecodedIdToken, UserContext>();

  constructor() {}

  static bind(user: DecodedIdToken): void {
    const ctx = new UserContext();
    UserContext._bindings.set(user, ctx);
  }

  static get(user: DecodedIdToken): UserContext | null {
    return UserContext._bindings.get(user) || null;
  }
}
