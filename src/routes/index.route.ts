/**
 * All api routes handles here
 * @author Sead Ali
 */
import { Router } from 'express';
import transactionRoutes from './transactions.route';
const router = Router();

// Parent Routes
router.use('/transactions', transactionRoutes);

// Export
export default router;
