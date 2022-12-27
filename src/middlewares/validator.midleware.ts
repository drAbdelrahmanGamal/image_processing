import { Request, Response, NextFunction } from 'express';
import { isValidImageName } from '../handlers/images.handler';

const validFormats = ['jpg', 'jpeg', 'png'];
export interface ValidImage {
  name: string;
  format: string;
  width?: number;
  height?: number;
}

export const checkResizeParams = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let validParams: object = {};
  const errors: string[] = [];

  const iamgeFormat = req.query.f
    ? validFormats.includes(req.query.f as string)
      ? (req.query.f as string)
      : 'jpg'
    : 'jpg';

  validParams = {
    ...validParams,
    format: iamgeFormat,
  };

  // check for image name param and its validity
  if (req.query.i) {
    const imageName: string = req.query.i as string;
    const imageExist: boolean = await isValidImageName(imageName);
    if (imageExist)
      validParams = {
        ...validParams,
        name: imageName,
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

  if (errors.length > 0) {
    res.status(400).send(`(${errors.join(', ')})`);
    return;
  }

  res.locals.validParams = validParams as ValidImage;
  next();
};
