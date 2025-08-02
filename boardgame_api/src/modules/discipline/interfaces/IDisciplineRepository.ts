import { CreateDisciplineDTO } from '../../dtos/CreateDisciplineDTO';

export interface IDisciplineRepository {
  create(data: CreateDisciplineDTO): Promise<CreateDisciplineDTO>;
}
