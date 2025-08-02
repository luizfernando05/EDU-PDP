export interface IRequest {
  discipline: string;
  topic: string;
  context?: string;
  type: 'question' | 'challenge' | 'decision';
}
