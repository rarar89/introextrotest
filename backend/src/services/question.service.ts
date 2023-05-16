import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Question } from '@/interfaces/question.interface';
import { QuestionModel } from '@/models/question.model';
import { AnswerModel } from '@/models/answers.model';

@Service()
export class QuestionService {
  public async getQuestion(id: number): Promise<Question> {
    const question: Question = QuestionModel.find(q => q.id === id);
    if (!question) {
      throw new HttpException(404, "Question doesn't exist");
    }

    question.answers = AnswerModel.filter(a => a.questionId === id);

    return question;
  }

  public async getTotalQuestions(): Promise<number> {
    return QuestionModel.length;
  }

  public async getAllQuestions(): Promise<Question[]> {
    return QuestionModel;
  }
}
