import { Router } from 'express';
import appRouter from './app.router';
import imageRouter from './images.router';

const router = Router();

router.use('/', appRouter);
router.use('/images', imageRouter);

export default router;
