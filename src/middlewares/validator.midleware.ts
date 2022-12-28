import { Request, Response, NextFunction } from 'express';
import { isValidImageName } from '../handlers/images.handler';

export interface ValidImage {
  name: string;
  format: string;
  width: number;
  height: number;
}

const isValidDimention = (dimention: number): boolean => {
  return Number.isInteger(dimention) && dimention > 0;
};

export const checkResizeParams = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let validParams: object = {};
  const errors: string[] = [];

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

  // check for width
  if (req.query.w) {
    const width: number = parseInt(req.query.w as string);
    if (isValidDimention(width))
      validParams = {
        ...validParams,
        width: width,
      };
    else errors.push('Invalid width value');
  } else errors.push('No width provided!');

  // check for height
  if (req.query.h) {
    const height: number = parseInt(req.query.h as string);
    if (isValidDimention(height))
      validParams = {
        ...validParams,
        height: height,
      };
    else errors.push('Invalid height value');
  } else errors.push('No height provided!');

  if (errors.length > 0) {
    res.status(400).send(`(${errors.join(', ')})`);
    return;
  }

  validParams = {
    ...validParams,
    format: 'jpg',
  };

  res.locals.validParams = validParams as ValidImage;
  next();
};
