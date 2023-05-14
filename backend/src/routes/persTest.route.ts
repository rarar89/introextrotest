import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { PersTestController } from '@/controllers/persTest.controller';

export class PersTestRoute implements Routes {
  public router = Router();
  public path = '/test';
  public personalityTest = new PersTestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/info`, this.personalityTest.getTestInfo);
    this.router.get(`${this.path}/type/:answers`, this.personalityTest.getPersonType);
  }
}
