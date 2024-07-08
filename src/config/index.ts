import { config as envConfig } from 'dotenv';
envConfig({ path: '.env' });

export const APP_NAME = process.env.APP_NAME ?? 'NodeJS TypeScript Boilerplate';
export const NODE_ENV = process.env.NODE_ENV ?? 'dev';
export const PORT = process.env.PORT ?? 5000;
export const REDIS_URL = process.env.REDIS_URL ?? '';
export const CACHE_TTL = parseInt(process.env.CACHE_TTL ?? '86400');
export const AVALANCHE_RPC_URL =
  process.env.AVALANCHE_RPC_URL ?? 'https://api.avax.network/ext/bc/C/rpc';
export const COINGECKO_API_URL =
  process.env.COINGECKO_API_URL ?? 'https://api.coingecko.com/api/v3/simple/token_price/avalanche';
export const HOST = process.env.HOST ?? 'http://localhost:5000';
export const ORIGIN = process.env.ORIGIN ?? 'http://localhost:3000';
