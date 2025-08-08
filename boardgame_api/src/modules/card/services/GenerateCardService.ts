import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

type CardType = 'question' | 'challenge' | 'decision';

export interface GeneratedCard {
  question: string;
  answer: string;
}

export class GenerateCardService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'https://api.cohere.ai/v1/generate';
  }

  async generateCard(
    discipline: string,
    disciplineSyllabus: string,
    topic: string,
    topicContext: string,
    type: CardType,
    context?: string
  ): Promise<GeneratedCard | undefined> {
    const prompt = this.buildPrompt(
      discipline,
      disciplineSyllabus,
      topic,
      type,
      topicContext,
      context
    );

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'command-r-plus-08-2024',
          prompt,
          max_tokens: 400,
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

      const match = text.match(/Pergunta:\s*(.+?)\nResposta:\s*(.+)/s);
      if (match) {
        return {
          question: match[1].trim(),
          answer: match[2].trim(),
        };
      } else {
        return {
          question: text,
          answer: '',
        };
      }
    } catch (err) {
      console.error('Erro ao se comunicar com a Cohere:', err);
      return undefined;
    }
  }

  private buildPrompt(
    discipline: string,
    disciplineSyllabus: string,
    topic: string,
    type: CardType,
    topicContext: string,
    context?: string
  ): string {
    const examples = {
      question: `
Disciplina: Engenharia de Software
Tópico: Arquitetura de Software
Tipo: Pergunta
Pergunta: Qual a principal vantagem de utilizar uma arquitetura hexagonal em aplicações corporativas modernas?
Resposta: A arquitetura hexagonal facilita a manutenção e evolução do sistema ao separar claramente as regras de negócio das interfaces externas, promovendo flexibilidade e testabilidade.
--`,
      challenge: `
Disciplina: Desenvolvimento de Produto
Tópico: Prototipagem
Tipo: Desafio
Pergunta: Crie um plano de prototipagem rápida para validar a funcionalidade central de um aplicativo de saúde mental voltado a universitários.
Resposta: Elabore wireframes das principais telas, realize entrevistas rápidas com estudantes, desenvolva um protótipo de baixa fidelidade e colete feedback em sessões de teste com usuários reais.
--`,
      decision: `
Disciplina: Gestão de Projetos
Tópico: Priorização de Requisitos
Tipo: Tomada de Decisão
Pergunta: Seu time precisa escolher entre desenvolver um recurso muito solicitado por clientes ou resolver uma dívida técnica crítica. Qual opção você prioriza e por quê?
Resposta: Priorize resolver a dívida técnica crítica, pois ela pode comprometer a estabilidade e escalabilidade do produto, impactando negativamente todos os usuários a longo prazo.
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

Agora gere apenas UMA carta nova para o seguinte caso, seguindo o formato:
Pergunta: <texto da carta>
Resposta: <resposta ou solução esperada>

Disciplina: ${discipline}
Ementa: ${disciplineSyllabus}
Tópico: ${topic}
Contexto: ${topicContext}
Tipo: ${this.capitalizeType(type)}
`;
  }

  private capitalizeType(type: CardType): string {
    if (type === 'question') return 'Pergunta';
    if (type === 'challenge') return 'Desafio';
    return 'Tomada de Decisão';
  }
}
