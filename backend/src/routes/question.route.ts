import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { QuestionController } from '@/controllers/question.controller';

export class QuestionRoute implements Routes {
  public router = Router();
  public path = '/question';
  public question = new QuestionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.question.getQuestion);
  }
}
