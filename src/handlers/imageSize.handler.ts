import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { getThumbnailPath } from './images.handler';
import { ValidImage } from '../middlewares/validator.midleware';

export const resizeImage = async (
  original: string,
  params: ValidImage,
  targetDir: string
): Promise<string> => {
  let image = sharp(original);

  await image.metadata().then((data: sharp.Metadata) => {
    params.width = params.width ? params.width : data.width;
    params.height = params.height ? params.height : data.height;
  });

  const targetImage = path.join(targetDir, getThumbnailPath(params));
  fs.ensureFileSync(targetImage);
  await image
    .resize(params.width, params.height)
    .toFormat(params.format as keyof sharp.FormatEnum)
    .toFile(targetImage)
    .then(() => {
      return targetImage;
    })
    .catch((err: Error) => {
      throw err;
    });
  return targetImage;
};
