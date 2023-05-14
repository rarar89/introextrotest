import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { QuestionRoute } from '@/routes/question.route';
import { PersTestRoute } from '@/routes/persTest.route';

ValidateEnv();

const app = new App([new QuestionRoute(), new PersTestRoute()]);

app.listen();
