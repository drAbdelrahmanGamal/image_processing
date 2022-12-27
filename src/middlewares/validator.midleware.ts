import { Request, Response, NextFunction } from 'express';
import { getOriginalImagesNames } from '../handlers/images.handler';

const validFormates = ['jpg', 'jpeg', 'png'];

export const check_resize_params = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const images: string[] = await getOriginalImagesNames();
  let validParams: object = {};
  let errors: string[] = [];

  // check for image name param and its validity
  if (req.query.i) {
    if (images.includes(req.query.i as string))
      validParams = {
        ...validParams,
        image_name: req.query.i as string,
      };
    else errors.push('Invalid image name!');
  } else errors.push('No image name provided!');

  // check for width or height
  if (req.query.w || req.query.h) {
    if (req.query.w) {
      if (Number.isInteger(parseInt(req.query.w as string)))
        validParams = {
          ...validParams,
          width: parseInt(req.query.w as string),
        };
      else errors.push('Invalid width value');
    }
    if (req.query.h) {
      if (Number.isInteger(parseInt(req.query.h as string)))
        validParams = {
          ...validParams,
          height: parseInt(req.query.h as string),
        };
      else errors.push('Invalid height value');
    }
  } else errors.push('No width or height provided!');

  if (req.query.f) {
    if (validFormates.includes(req.query.f as string))
      validParams = {
        ...validParams,
        format: req.query.f as string,
      };
    else errors.push('Invalid format value');
  }

  if (errors.length > 0) res.status(400).send(`(${errors.join(', ')})`);
  res.locals.validParams = validParams;
  next();
};
