import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { getThumbnailPath } from './images.handler';
import { ValidImage } from '../middlewares/validator.midleware';

// const prepareName = (
//   imageName: string,
//   size: {
//     width: number;
//     height: number;
//   }
// ): string => {
//   return `${imageName.slice(0, imageName.split('.').pop()?.length)}-${
//     size.width
//   }-${size.height}`;
// };

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
    .resize(params.width, params.height, {
      fit: sharp.fit.fill,
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      position: sharp.gravity.center,
    })
    .toFormat(params.format as keyof sharp.FormatEnum)
    .toFile(targetImage)
    .then(() => {
      console.log('resize done');
      return targetImage;
    })
    .catch((err: Error) => {
      throw err;
    });
  return targetImage;
};
