import path from 'path';
import {
  getThumbnailPath,
  isThumbnailExist,
  isValidImageName,
} from '../../handlers/images.handler';

describe('Test image handlers', (): void => {
  it('Check for "01" image to be exist in original images', async (): Promise<void> => {
    expect(await isValidImageName('01')).toBeTruthy();
  });

  const testTumbnail = path.join('test_jpg', '400_400.jpg');
  it('Get image thumbnail path', (): void => {
    expect(
      getThumbnailPath({
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
});
