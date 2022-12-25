import { Router } from 'express';
import resizeRouter from './images/resize.router';

const imageRouter = Router();

imageRouter.get('/', (req, res) => {
  res.send('hello world! from image router');
});
imageRouter.use('/resize', resizeRouter);

export default imageRouter;
