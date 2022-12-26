import { promises as fs } from 'fs';
import path from 'path';
// import sharp from 'sharp';

const images_dir = './public/images';
const original_imgs_dir = path.join(images_dir, 'original');
// const thumbs_imgs_dir = path.join(images_dir, 'thumbnails');

export type file = {
  path: string;
  name: string;
};

const searchFiles = async (
  folderName: string,
  children: file[]
): Promise<file[]> => {
  let files: file[] = [];
  const filesNames: string[] = await fs.readdir(folderName);

  for (const fileName of filesNames) {
    const filePath = path.join(folderName, fileName).normalize();
    const fileStats = await fs.lstat(filePath);

    if (fileStats.isDirectory()) {
      files = await searchFiles(filePath, files);
    }

    if (fileStats.isFile()) {
      files.push({
        path: filePath,
        name: fileName,
      });
    }
  }

  return [...children, ...files];
};

export const getOriginalImages = async (): Promise<file[]> => {
  return await searchFiles(original_imgs_dir, []);
};

export const getOriginalImagesNames = async (): Promise<string[]> => {
  const originalImages = await searchFiles(original_imgs_dir, []);
  return originalImages.map((image: file) => {
    return image.name;
  });
};
