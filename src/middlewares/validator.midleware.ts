import { Request, Response, NextFunction } from 'express';
import { getOriginalImagesNames } from '../handlers/images.handler';

export const check_resize_params = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const images: string[] = await getOriginalImagesNames();
  let errors: string[] = [];

  // check for image name param and its validity
  if (!req.query.i) {
    errors.push('No image name provided!');
  } else if (!images.includes(req.query.i as string)) {
    errors.push('Invalid image name!');
  }

  // check for width param and its validity
  if (!req.query.w) {
    errors.push('No width provided!');
  } else if (!Number.isInteger(parseInt(req.query.w as string))) {
    errors.push('Invalid width value');
  }

  // check for height param and its validity
  if (!req.query.h) {
    errors.push('No height provided!');
  } else if (!Number.isInteger(parseInt(req.query.h as string))) {
    errors.push('Invalid height value');
  }

  if (errors.length > 0) res.status(400).send(errors.join('\n'));

  next();
};
