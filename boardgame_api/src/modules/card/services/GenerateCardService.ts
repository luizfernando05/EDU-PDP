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
    type: CardType,
    context?: string
  ): Promise<string | undefined> {
    const prompt = this.buildPrompt(discipline, topic, type, context);

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
    type: CardType,
    context?: string
  ): string {
    const examples = {
      question: `
Disciplina: Engenharia de Software
Tópico: Arquitetura de Software
Tipo: Pergunta
Carta: Qual a principal vantagem de utilizar uma arquitetura hexagonal em aplicações corporativas modernas?
--`,
      challenge: `
Disciplina: Desenvolvimento de Produto
Tópico: Prototipagem
Tipo: Desafio
Carta: Crie um plano de prototipagem rápida para validar a funcionalidade central de um aplicativo de saúde mental voltado a universitários.
--`,
      decision: `
Disciplina: Gestão de Projetos
Tópico: Priorização de Requisitos
Tipo: Tomada de Decisão
Carta: Seu time precisa escolher entre desenvolver um recurso muito solicitado por clientes ou resolver uma dívida técnica crítica. Qual opção você prioriza e por quê?
--`,
    };

    return `
Você é um gerador de cartas para um jogo de tabuleiro voltado a estudantes universitários. Cada carta pertence a uma disciplina acadêmica e aborda um tópico relevante dessa área. As cartas devem promover reflexão crítica, aplicação prática ou tomada de decisão baseada em contexto.

As cartas podem ser de três tipos:
- Pergunta: estimula conhecimento teórico ou conceitual.
- Desafio: propõe uma tarefa prática ou criativa.
- Tomada de Decisão: apresenta um dilema realista e requer uma escolha argumentada.

${context ? `Contexto da disciplina: ${context}\n` : ''}

Aqui está um exemplo do tipo que queremos:

${examples[type]}

Agora gere apenas UMA carta nova para o seguinte caso:

Disciplina: ${discipline}
Tópico: ${topic}
Tipo: ${this.capitalizeType(type)}
Carta:
`;
  }

  private capitalizeType(type: CardType): string {
    if (type === 'question') return 'Pergunta';
    if (type === 'challenge') return 'Desafio';
    return 'Tomada de Decisão';
  }
}
