const isDev = process.env.NODE_ENV === 'development';

export const logger = {
    info: (...args: any[]) => isDev && console.info(...args),
    warn: (...args: any[]) => isDev && console.warn(...args),
    error: (...args: any[]) => console.error(...args), // Always log errors
    debug: (...args: any[]) => isDev && console.debug(...args),
};
