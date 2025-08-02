import { Request, Response } from 'express';
import { GenerateCardService } from '../services/GenerateCardService';
import { GenerateCardUseCase } from '../usecases/GenerateCardUseCase';

export class GenerateCardController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { discipline, topic, type } = req.body;

      if (!discipline || !topic || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const service = new GenerateCardService();
      const useCase = new GenerateCardUseCase(service);

      const result = await useCase.execute({ discipline, topic, type });

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error generating card' });
    }
  }
}
