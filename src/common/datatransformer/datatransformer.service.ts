import { Injectable } from '@nestjs/common';
import { ITransformer } from './ITransformer';
import { LoginReqTransform } from './transformers/login.req';

@Injectable()
export class DataTransformerService {
  private readonly requestTransformers: Record<string, ITransformer<unknown>> =
    {};

  constructor() {
    this.addTransformer(LoginReqTransform);
  }

  addTransformer(transformer: ITransformer<unknown>) {
    if (transformer.isRequest) {
      if (!!this.requestTransformers[transformer.endpoint])
        throw new Error(
          `DUPLICATION: Transformer ${transformer.endpoint} already exists`,
        );
      this.requestTransformers[transformer.endpoint] = transformer;
    }
  }

  transform(input: unknown, endpoint: string, isRequest: boolean) {
    const transformers = isRequest ? this.requestTransformers : null;
    if (!transformers[endpoint]) return input;
    return transformers[endpoint].transform(input);
  }
}
