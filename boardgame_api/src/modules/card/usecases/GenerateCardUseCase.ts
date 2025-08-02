import { IRequest } from '../Interfaces/IRequest';
import { GenerateCardService } from '../services/GenerateCardService';

export class GenerateCardUseCase {
  constructor(private generateCardService: GenerateCardService) {}

  async execute({ discipline, topic, type }: IRequest) {
    const cardContent = await this.generateCardService.generateCard(
      discipline,
      topic,
      type
    );

    return { card: cardContent };
  }
}
