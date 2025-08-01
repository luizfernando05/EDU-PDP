import { Document } from 'mongoose';

export interface IDiscipline extends Document {
  name: string;
  topics: string[];
}
