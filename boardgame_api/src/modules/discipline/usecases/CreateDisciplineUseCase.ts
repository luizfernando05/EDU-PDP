import { DisciplineModel } from '../../../domain/models/Discipline';
import { CreateDisciplineDTO } from '../../dtos/CreateDisciplineDTO';

export class CreateDisciplineUseCase {
  async execute(data: CreateDisciplineDTO) {
    const discipline = new DisciplineModel(data);
    await discipline.save();
    return discipline;
  }
}
