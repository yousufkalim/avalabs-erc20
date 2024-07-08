/**
 * All the validation
 * @author Sead Ali
 */
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/*
====================
Validations
====================
*/

/*
======================
Result
======================
*/

/**
 * To check if request validated successfully or not, according to our validation strategies
 * @param {object} req
 * @param {object} res
 * @param {*} next
 */
export const isValidated = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req); // Validating the request by previous middleware's strategy
  if (!errors.isEmpty()) {
    // On error
    return res.status(400).send({ success: false, message: errors.array()[0].msg }); // Sending first error to the client from array of errors
  } else {
    // Validated successfully
    next(); // Pass the request to next middleware or controller
  }
};
