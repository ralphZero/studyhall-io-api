export const isDevelop = () => {
  const env = process.env.NODE_ENV;
  return !!env && env === 'development';
};

export const isProd = () => {
  const env = process.env.NODE_ENV;
  return !!env && env === 'production';
};

export const isLocal = () => {
  const env = process.env.NODE_ENV;
  return !!env && env === 'local';
};
