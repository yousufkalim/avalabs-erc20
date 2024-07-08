/**
 * Transaction CRUD routes
 * @author Sead Ali
 */
import { Router } from 'express';
import { getTransaction } from '@controllers/transactions.controller';
const router = Router();

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get transaction by hash
 */

// GET
router.get('/:hash', getTransaction);

// Export
export default router;
