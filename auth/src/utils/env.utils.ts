const ENV = process.env.NODE_ENV || 'development';

export function getEnv(): 'development' | 'production' | 'test' {
  if (ENV === 'production') return 'production';
  return 'development';
}

export function isDev(): boolean {
  return getEnv() === 'development';
}

export function isProd(): boolean {
  return getEnv() === 'production';
}
