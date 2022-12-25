import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', (req, res) => {
  res.send('Hello World! from app router');
});

export default appRouter;
