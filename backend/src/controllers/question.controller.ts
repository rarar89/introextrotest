import { QuestionService } from '@/services/question.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class QuestionController {
    public question = Container.get(QuestionService);

    public getQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const question = await this.question.getQuestion(parseInt(req.params.id))

            res.status(200).json( question );
        } catch (error) {
            next(error);
        }
    }
};