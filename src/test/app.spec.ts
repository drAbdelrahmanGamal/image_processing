import supertest from 'supertest';
import app from '../app';

// eslint-disable-next-line
export const testEnd = (done: DoneFn) => {
  return (err: Error): void => {
    if (err) done.fail(err);
    else done();
  };
};

describe('Test server up and running', (): void => {
  it('should run server on localhost correctly with status: 200', (done): void => {
    supertest(app).get('/').expect(200, testEnd(done));
  });
});
