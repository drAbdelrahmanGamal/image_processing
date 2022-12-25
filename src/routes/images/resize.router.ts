import { Router } from 'express';

const resizeRouter = Router();

resizeRouter.get('/', (req, res) => {
  res.send('Hello World! from resize middleware');
});

export default resizeRouter;
