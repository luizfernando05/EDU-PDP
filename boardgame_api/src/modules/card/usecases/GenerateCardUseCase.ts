import { IRequest } from '../Interfaces/IRequest';
import { GenerateCardService } from '../services/GenerateCardService';

export class GenerateCardUseCase {
  constructor(private generateCardService: GenerateCardService) {}

  async execute({
    discipline,
    disciplineSyllabus,
    topic,
    topicContext,
    context,
    type,
  }: IRequest) {
    const cardContent = await this.generateCardService.generateCard(
      discipline,
      disciplineSyllabus,
      topic,
      topicContext,
      type,
      context
    );

    return { card: cardContent };
  }
}
