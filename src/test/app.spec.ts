import supertest from 'supertest';
import app from '../app';

describe('Test server up and running', (): void => {
  it('should run server on localhost correctly with status: 200', (): void => {
    supertest(app).get('/').expect(200);
  });
});

describe('Test app endpoints', (): void => {
  describe('Test main route endpoint', (): void => {
    it('should return 200 on /', (): void => {
      supertest(app).get('/').expect(200);
    });
  });

  describe('Test images route endpoints', (): void => {
    it('should return 200 on /images', (): void => {
      supertest(app).get('/images').expect(200);
    });

    describe('Test images/resize route endpoint', (): void => {
      it('should return 200 on /images/resize', (): void => {
        supertest(app).get('/images/resize').expect(200);
      });

      // it('should return 200 on /images/1', (): void => {
      //   supertest(app).get('/images/1').expect(200);
      // });
    });
  });
});
