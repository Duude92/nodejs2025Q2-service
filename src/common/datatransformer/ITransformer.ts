export interface ITransformer<T> {
  endpoint: string;
  isRequest: boolean;
  transform: (input: T) => T;
}
