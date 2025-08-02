import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

type CardType = 'question' | 'challenge' | 'decision';

export class GenerateCardService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'https://api.cohere.ai/v1/generate';
  }

  async generateCard(
    discipline: string,
    topic: string,
    type: CardType
  ): Promise<string | undefined> {
    const prompt = this.buildPrompt(discipline, topic, type);

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'command-r-plus-08-2024',
          prompt,
          max_tokens: 300,
          temperature: 0.8,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const text = response.data.generations?.[0]?.text?.trim();
      if (!text) throw new Error('Empty response from Cohere');

      return text;
    } catch (err) {
      console.error('Erro ao se comunicar com a Cohere:', err);
      return undefined;
    }
  }

  private buildPrompt(
    discipline: string,
    topic: string,
    type: CardType
  ): string {
    const examples = {
      question: `
Disciplina: História
Tópico: Revolução Francesa
Tipo: Pergunta
Carta: Qual foi o papel da Bastilha no início da Revolução Francesa?
--`,
      challenge: `
Disciplina: Física
Tópico: Leis de Newton
Tipo: Desafio
Carta: Simule uma situação em que a 2ª Lei de Newton pode ser demonstrada usando apenas materiais escolares.
--`,
      decision: `
Disciplina: Biologia
Tópico: Mudanças Climáticas
Tipo: Tomada de Decisão
Carta: Você é um cientista em uma conferência global. Deve escolher entre implementar políticas de reflorestamento imediato ou investir em tecnologia de captura de carbono. Justifique sua escolha.
--`,
    };

    return `
Você é um gerador de cartas para um jogo de tabuleiro educativo. Cada carta pertence a uma disciplina e aborda um tópico específico. As cartas podem ser de três tipos: Pergunta, Desafio ou Tomada de Decisão. Gere uma carta criativa e clara, seguindo o padrão dos exemplos abaixo.

${examples[type]}

Disciplina: ${discipline}
Tópico: ${topic}
Tipo: ${this.capitalizeType(type)}
Carta:`;
  }

  private capitalizeType(type: CardType): string {
    if (type === 'question') return 'Pergunta';
    if (type === 'challenge') return 'Desafio';
    return 'Tomada de Decisão';
  }
}
