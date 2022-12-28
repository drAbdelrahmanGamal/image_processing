import fs from 'fs-extra';
import {
  getThumbnailName,
  getThumbnailPath,
  isThumbnailExist,
  isValidImageName,
} from '../../handlers/images.handler';
import { resizeImage } from '../../handlers/imageSize.handler';

describe('Test image handlers', (): void => {
  it('Check for "01" image to be exist in original images', async (): Promise<void> => {
    expect(await isValidImageName('01')).toBeTruthy();
  });

  const testTumbnail = 'test_400_400.jpg';
  it('Get image thumbnail path', (): void => {
    expect(
      getThumbnailName({
        name: 'test',
        format: 'jpg',
        width: 400,
        height: 400,
      })
    ).toEqual(testTumbnail);
  });

  it(`Check for ${testTumbnail} image to be exist in original images`, async (): Promise<void> => {
    expect(await isThumbnailExist(testTumbnail)).toBeFalsy;
  });

  const validThumbnail = '02_400_400.jpg';
  const thumbnailPath = getThumbnailPath(validThumbnail);
  it('Check for resizing image function', async (): Promise<void> => {
    if (await isThumbnailExist(validThumbnail)) {
      fs.removeSync(thumbnailPath);
    }
    const targetImage = await resizeImage(
      {
        name: '02',
        format: 'jpg',
        width: 400,
        height: 400,
      },
      thumbnailPath
    );
    expect(targetImage).toEqual(thumbnailPath);
  });
});
