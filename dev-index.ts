import { devApi } from './index';
import { isDevelop } from './src/utils/environment';

const port: number = 8001;

if (isDevelop()) {
  devApi.listen(port, () => {
    console.log(`Started on ${process.env.NODE_ENV}:`, port);
  });
}
