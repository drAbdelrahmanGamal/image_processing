import { Router } from 'express';
import { fetchImage, openImage } from '../../handlers/images.handler';
import { checkResizeParams } from '../../middlewares/validator.midleware';

const resizeRouter = Router();
const handlers = [checkResizeParams, fetchImage, openImage];

resizeRouter.get('/', handlers);

export default resizeRouter;
