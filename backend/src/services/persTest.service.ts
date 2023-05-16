import Container, { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { QuestionService } from './question.service';
import { AnswerModel } from '@/models/answers.model';

export enum PersType {
  Introvert = 'Introvert',
  Extrovert = 'Extrovert',
  Middle = 'Middle',
}

@Service()
export class PersTestService {
  public question = Container.get(QuestionService);

  public async getType(answers: number[]): Promise<{ type: PersType }> {
    const totalQuestions = await this.question.getTotalQuestions();

    if (answers.length !== totalQuestions) {
      throw new HttpException(400, 'Incorrect amount of questions submited!');
    }

    const score = await this.calculateScore(answers);

    if (score.introvert > score.extrovert) {
      return { type: PersType.Introvert };
    } else if (score.introvert < score.extrovert) {
      return { type: PersType.Extrovert };
    } else {
      return { type: PersType.Middle };
    }
  }

  public async getInfo(): Promise<{ totalQuestions: number }> {
    const totalQuestions = await this.question.getTotalQuestions();

    return {
      totalQuestions: totalQuestions,
    };
  }

  private async calculateScore(answers: number[]): Promise<{ introvert: number; extrovert: number }> {
    let totalIntrovertScore = 0;
    let totalExtrovertScore = 0;
    const answeredQuestions = new Set<number>();

    answers.map(id => {
      const answer = AnswerModel.find(a => a.id === id);

      if (answer) {
        if (answeredQuestions.has(answer.questionId)) {
          throw new HttpException(400, 'Single question can have only one answer!');
        }

        answeredQuestions.add(answer.questionId);

        totalIntrovertScore += answer.introvertScore;
        totalExtrovertScore += answer.extrovertScore;
      }
    });

    return { introvert: totalIntrovertScore, extrovert: totalExtrovertScore };
  }
}
