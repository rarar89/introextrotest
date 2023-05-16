import request from 'supertest';
import { App } from '@/app';
import { PersTestRoute } from '@/routes/persTest.route';
import { QuestionModel } from '@/models/question.model';
import { PersType } from '@/services/persTest.service';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST PersTest API', () => {
  const route = new PersTestRoute();
  const app = new App([route]);

  describe('[GET] /test/info', () => {
    it('response statusCode 200 /getInfo', () => {
      return request(app.getServer()).get(`${route.path}/info`).expect(200, { totalQuestions: QuestionModel.length });
    });
  });

  describe('[GET] /test/type/:answers', () => {
    it('response statusCode 200 /getType', () => {
      const answers = [1, 5, 10, 15, 20];

      return request(app.getServer())
        .get(`${route.path}/type/${answers.join(',')}`)
        .expect(200, { type: PersType.Introvert });
    });
  });
});
