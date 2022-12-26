import { Router } from 'express';
import { check_resize_params } from '../../middlewares/validator.midleware';

const resizeRouter = Router();

resizeRouter.get('/', check_resize_params, (req, res) => {
  if (res.statusCode == 200) {
    res.send(`Hello World! from resize route`);
  }
});

export default resizeRouter;
