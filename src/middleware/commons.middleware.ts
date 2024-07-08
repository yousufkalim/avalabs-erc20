/**
 * Common middleware that we have to use by default every time
 * @author Sead Ali
 */
import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import { NODE_ENV, ORIGIN } from '@config';

// Common Middleware
export default function middleware(app: Application): void {
  app.use(cors({ origin: NODE_ENV === 'prod' ? ORIGIN : true, credentials: true })); // CORS (Cross Origin Policy) to restrict unknown requests
  app.use(logger('dev')); // Morgan - to log every request in console
  app.use(express.urlencoded({ extended: true })); // to get url encoded data from requests
  app.use(express.json()); // to send json data in response (It's mandatory in rest api's)
}
