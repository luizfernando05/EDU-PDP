export interface IRequest {
  discipline: string;
  disciplineSyllabus: string;
  topic: string;
  context?: string;
  topicContext: string;
  type: 'question' | 'challenge' | 'decision';
}
