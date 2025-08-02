import { NextFunction, Request, Response } from 'express';
import { CreateDisciplineUseCase } from '../usecases/CreateDisciplineUseCase';

export class CreateDisciplineController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, topics } = req.body;

      const useCase = new CreateDisciplineUseCase();
      const discipline = await useCase.execute({ name, topics });

      return res.status(201).json(discipline);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error creating discipline' });
    }
  }
}
