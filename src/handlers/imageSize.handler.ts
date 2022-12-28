import sharp from 'sharp';
import fs from 'fs-extra';
import { ValidImage } from '../middlewares/validator.midleware';
import { originalsDir } from './images.handler';
import path from 'path';

export const resizeImage = async (
  params: ValidImage,
  targetImage: string
): Promise<string> => {
  let image = sharp(path.join(originalsDir, `${params.name}.jpg`));

  fs.ensureFileSync(targetImage);
  const done: boolean = await image
    .resize(params.width, params.height)
    .toFormat(params.format as keyof sharp.FormatEnum)
    .toFile(targetImage)
    .then(() => true)
    .catch(() => false);

  return done ? targetImage : '';
};
