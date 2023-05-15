import { PersTestService } from '@/services/persTest.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class PersTestController {
    public persTest = Container.get(PersTestService);

    public getPersonType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const answers = req.params.answers.split(',');

            const persType = await this.persTest.getType(answers.map(a=>parseInt(a)));

            res.status(200).json(persType);
        } catch (error) {
            next(error);
        }
    }

    public getTestInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            
            const testInfo = await this.persTest.getInfo();

            res.status(200).json(testInfo);
        } catch (error) {
            next(error);
        }
    }
};