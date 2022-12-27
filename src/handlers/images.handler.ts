import path from 'path';
import fs from 'fs-extra';
import { Request, Response, NextFunction } from 'express';
import { ValidImage } from '../middlewares/validator.midleware';
import { resizeImage } from './imageSize.handler';

const imagesDir = './public/images';
const originalsDir = path.join(imagesDir, 'original');
const thumblnailsDir = path.join(imagesDir, 'thumbnails');

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

export const getThumbnailPath = (image: ValidImage): string => {
  return path.join(
    image.name,
    `${image!.width}_${image!.height}.${image.format}`
  );
};

export const isThumbnailExist = async (thumbnailPath: string) => {
  return await fs.pathExists(path.join(thumblnailsDir, thumbnailPath));
};

export const fetchImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let image: ValidImage = res.locals.validParams;

  if (image.width && image.height) {
    const thumbnailPath = getThumbnailPath(image);
    const thumbnailExist = await isThumbnailExist(thumbnailPath);
    console.log('thumbnailExist :', thumbnailExist);

    if (thumbnailExist) {
      res.locals.fetchedImage = path.join(thumblnailsDir, thumbnailPath);
      next();
    }
  }

  res.locals.fetchedImage = await resizeImage(
    path.join(originalsDir, `${image.name}.${image.format}`),
    image,
    thumblnailsDir
  );

  next();
};

export const openImage = (req: Request, res: Response) => {
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
