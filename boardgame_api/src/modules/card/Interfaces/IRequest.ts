export interface IRequest {
  discipline: string;
  topic: string;
  type: 'question' | 'challenge' | 'decision';
}
