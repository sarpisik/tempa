import { Router } from 'express';
import { about } from './about';
import { home } from './home';
import UserRouter from './Users';
import { api } from './api';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/', home);
router.use('/about', about);
router.use('/api', api);
router.use('/users', UserRouter);

// Export the base-router
export default router;
