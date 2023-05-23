import { devApi } from './index';
import { isLocal } from './src/utils/environment';

const port: number = 8001;

if (isLocal()) {
  devApi.listen(port, () => {
    console.log(`Started on ${process.env.NODE_ENV}:`, port);
  });
}
