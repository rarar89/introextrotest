import request from 'supertest';
import { App } from '@/app';
import { QuestionModel } from '@/models/question.model';
import { QuestionRoute } from '@/routes/question.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Question API', () => {
  const route = new QuestionRoute();
  const app = new App([route]);

  describe('[GET] /question/:id', () => {
    it('response statusCode 200 /getQuestion', () => {
      const question = QuestionModel[0];

      return request(app.getServer()).get(`${route.path}/${question.id}`).expect(200, question);
    });
  });
});
