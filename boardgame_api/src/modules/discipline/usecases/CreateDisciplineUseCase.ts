import { DisciplineModel } from '../../../domain/models/Discipline';
import { CreateDisciplineDTO } from '../../dtos/CreateDisciplineDTO';
import { IDisciplineRepository } from '../interfaces/IDisciplineRepository';

export class CreateDisciplineUseCase {
  constructor(private disciplineRepo: IDisciplineRepository) {}

  async execute(data: CreateDisciplineDTO) {
    const result = await this.disciplineRepo.create(data);
    return result;
  }
}
