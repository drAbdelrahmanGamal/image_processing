import {
  file,
  getOriginalImages,
  getOriginalImagesNames,
  isValidImageName,
} from '../../handlers/images.handler';

describe('Test images handler', (): void => {
  it('Should return original images', async (): Promise<void> => {
    const originalImages: file[] = await getOriginalImages();
    expect(originalImages.length).toBe(4);
  });
  it('Should return number of images in original folder to be 4', async (): Promise<void> => {
    const imagesNames: string[] = await getOriginalImagesNames();
    expect(imagesNames.length).toBe(4);
  });
  it('Shoud check for 01.png to be exist in original images', async (): Promise<void> => {
    expect(await isValidImageName('01.png')).toBe(true);
  });
});
