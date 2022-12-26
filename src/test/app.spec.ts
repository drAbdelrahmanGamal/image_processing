import supertest from 'supertest';
import app from '../app';

describe('Test server up and running', (): void => {
  it('should run server on localhost correctly with status: 200', (done): void => {
    supertest(app)
      .get('/')
      .expect(200)
      .end((err: Error) => {
        if (err) done.fail(err);
        else done();
      });
  });
});
