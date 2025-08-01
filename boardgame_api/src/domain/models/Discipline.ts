import { model, Schema } from 'mongoose';
import { IDiscipline } from '../../interfaces/IDiscipline';

const DisciplineSchema = new Schema<IDiscipline>({
  name: { type: String, required: true },
  topics: { type: [String], default: [] },
});

export const DisciplineModel = model<IDiscipline>(
  'Discipline',
  DisciplineSchema
);
