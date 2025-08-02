import { IRequest } from '../Interfaces/IRequest';
import { GenerateCardService } from '../services/GenerateCardService';

export class GenerateCardUseCase {
  constructor(private generateCardService: GenerateCardService) {}

  async execute({ discipline, topic, context, type }: IRequest) {
    const cardContent = await this.generateCardService.generateCard(
      discipline,
      topic,
      type,
      context
    );

    return { card: cardContent };
  }
}
