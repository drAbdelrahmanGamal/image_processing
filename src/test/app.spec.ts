import supertest from 'supertest';
import app from '../app';

describe('Test server', (): void => {
  it('should run server on localhost:3000', (): void => {
    supertest(app).get('/').expect(200);
  });
});
