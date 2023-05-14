import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { QuestionRoute } from '@/routes/question.route';

ValidateEnv();

const app = new App([new QuestionRoute()]);

app.listen();
