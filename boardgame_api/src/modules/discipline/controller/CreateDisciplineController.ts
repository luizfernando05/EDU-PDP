import { NextFunction, Request, Response } from 'express';
import { CreateDisciplineUseCase } from '../usecases/CreateDisciplineUseCase';
import { DisciplineRepository } from '../repositories/DisciplineRepository';

export class CreateDisciplineController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, topics } = req.body;

      const repository = new DisciplineRepository();
      const useCase = new CreateDisciplineUseCase(repository);

      const result = await useCase.execute({ name, topics });

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error creating discipline' });
    }
  }
}
