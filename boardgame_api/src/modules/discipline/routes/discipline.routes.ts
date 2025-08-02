import { Router } from 'express';
import { CreateDisciplineController } from '../controller/CreateDisciplineController';

const disciplineRoutes = Router();
const createController = new CreateDisciplineController();

disciplineRoutes.post(
  '/disciplines',
  createController.handle.bind(createController)
);

export default disciplineRoutes;
