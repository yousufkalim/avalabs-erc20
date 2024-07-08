import { config as envConfig } from 'dotenv';
envConfig({ path: '.env' });

export const APP_NAME = process.env.APP_NAME ?? 'NodeJS TypeScript Boilerplate';
export const NODE_ENV = process.env.NODE_ENV ?? 'dev';
export const PORT = process.env.PORT ?? 5000;
export const HOST = process.env.HOST ?? 'http://localhost:5000';
export const ORIGIN = process.env.ORIGIN ?? 'http://localhost:3000';
