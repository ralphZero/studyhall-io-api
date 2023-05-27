import { DecodedIdToken } from 'firebase-admin/auth';

interface DevDecodedIdTokenType {
  uid: string;
  email: string;
}

export const DevDecodedIdToken = ({
  email,
  uid,
}: DevDecodedIdTokenType): DecodedIdToken => {
  return {
    email,
    aud: '',
    auth_time: 0,
    exp: 0,
    firebase: {
      identities: {},
      sign_in_provider: '',
      sign_in_second_factor: undefined,
      second_factor_identifier: undefined,
      tenant: undefined,
    },
    iat: 0,
    iss: '',
    sub: '',
    uid,
  };
};
