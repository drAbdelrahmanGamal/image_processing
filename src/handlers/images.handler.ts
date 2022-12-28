import path from 'path';
import fs from 'fs-extra';
import { Request, Response, NextFunction } from 'express';
import { ValidImage } from '../middlewares/validator.midleware';
import { resizeImage } from './imageSize.handler';

const imagesDir = './public/images';
export const originalsDir = path.join(imagesDir, 'original');
const thumbnailsDir = path.join(imagesDir, 'thumbnails');

export type file = {
  path: string;
  name: string;
};

const isImageExist = async (
  folderPath: string,
  imageName: string
): Promise<boolean> => {
  return await fs.pathExists(path.join(folderPath, imageName));
};

export const isValidImageName = async (imageName: string): Promise<boolean> => {
  return await isImageExist(originalsDir, `${imageName}.jpg`);
};

export const getThumbnailPath = (thumbnailName: string): string => {
  return path.join(thumbnailsDir, thumbnailName);
};

export const getThumbnailName = (image: ValidImage): string => {
  return `${image.name}_${image.width}_${image.height}.${image.format}`;
};

export const isThumbnailExist = async (
  thumbnailName: string
): Promise<boolean> => await fs.pathExists(getThumbnailPath(thumbnailName));

export const prepareImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let image: ValidImage = res.locals.validParams;

  const thumbnailName = getThumbnailName(image);
  const thumbnailExist = await isThumbnailExist(thumbnailName);

  if (thumbnailExist) {
    res.locals.fetchedImage = getThumbnailPath(thumbnailName);
    next();
  } else {
    const result = await resizeImage(image, getThumbnailPath(thumbnailName));

    if (result && result != '') {
      res.locals.fetchedImage = result;
      next();
    } else {
      res.send('image failed to resize').status(400);
    }
  }
};

export const openImage = (req: Request, res: Response): void => {
  fs.readFile(res.locals.fetchedImage)
    .then((data: Buffer) => {
      res
        .set('Content-Type', `image/${res.locals.validParams.format}`)
        .send(data);
    })
    .catch((err: Error) => {
      if (err) throw err;
    });
};
