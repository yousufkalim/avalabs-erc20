/**
 * Redis Client
 * @author Sead Ali
 */
import { createClient } from 'redis';
import { REDIS_URL } from '@config';

const client = createClient({
  url: REDIS_URL,
});

client.on('error', (err) => console.log('Redis Client Error', err));

// eslint-disable-next-line @typescript-eslint/no-floating-promises
client.connect();

export default client;
