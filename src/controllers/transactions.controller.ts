/**
 * Transaction CRUD controllers
 * @author Sead Ali
 */
import { Request, Response } from 'express';


/**
 * Get transaction by hash
 * @param {object} _req
 * @param {object} res
 */
export const getTransaction = async (_req: Request, res: Response): Promise<Response> => {
  try {
    return res.json({ success: true }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
