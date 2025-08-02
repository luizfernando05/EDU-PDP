import { DisciplineModel } from '../../../domain/models/Discipline';
import { CreateDisciplineDTO } from '../dtos/CreateDisciplineDTO';
import { IDisciplineRepository } from '../interfaces/IDisciplineRepository';

export class DisciplineRepository implements IDisciplineRepository {
  async create(data: CreateDisciplineDTO): Promise<CreateDisciplineDTO> {
    const discipline = new DisciplineModel(data);
    await discipline.save();
    return discipline.toObject();
  }
}
