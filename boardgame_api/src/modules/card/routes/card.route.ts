import { Router } from 'express';
import { GenerateCardController } from '../controllers/GenerateCardController';

const cardRoutes = Router();
const generateCardController = new GenerateCardController();

cardRoutes.post('/generate-card', (req, res) =>
  generateCardController.handle(req, res)
);

export default cardRoutes;
