import { Router } from 'express';
import { prepareImage, openImage } from '../../handlers/images.handler';
import { checkResizeParams } from '../../middlewares/validator.midleware';

const resizeRouter = Router();
const handlers = [checkResizeParams, prepareImage, openImage];

resizeRouter.get('/', handlers);

export default resizeRouter;
