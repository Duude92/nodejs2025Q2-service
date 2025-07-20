import { Injectable } from '@nestjs/common';
import { ITransformer } from './ITransformer';
import { LoginReqTransform } from './transformers/login.req';
import { LoginResTransform } from './transformers/login.res';
import { RefreshReqTransform } from './transformers/refresh.req';
import { RefreshResTransform } from './transformers/refresh.res';
import { SignupResTransform } from './transformers/signup.req';
import { UserCreateReqTransform } from './transformers/usercreate.req';
import { UserUpdateReqTransform } from './transformers/userupdate.req';

@Injectable()
export class DataTransformerService {
  private readonly requestTransformers: Record<string, ITransformer<unknown>> =
    {};
  private readonly responseTransformers: Record<string, ITransformer<unknown>> =
    {};

  constructor() {
    this.addTransformer(LoginReqTransform);
    this.addTransformer(LoginResTransform);
    this.addTransformer(RefreshReqTransform);
    this.addTransformer(RefreshResTransform);
    this.addTransformer(SignupResTransform);
    this.addTransformer(UserCreateReqTransform);
    this.addTransformer(UserUpdateReqTransform);
  }

  getTransformers(isRequest: boolean) {
    return isRequest ? this.requestTransformers : this.responseTransformers;
  }

  addTransformer(transformer: ITransformer<unknown>) {
    const transformers = this.getTransformers(transformer.isRequest);

    if (!!transformers[transformer.endpoint])
      throw new Error(
        `DUPLICATION: Transformer ${transformer.endpoint} already exists`,
      );
    transformers[transformer.endpoint] = transformer;
  }

  transform(
    input: unknown,
    endpoint: string,
    isRequest: boolean,
    method: string = 'POST',
  ) {
    const transformers = this.getTransformers(isRequest);
    if (!transformers[endpoint]) {
      endpoint = method + ':' + endpoint;
      if (!transformers[endpoint]) return input;
    }
    return transformers[endpoint].transform(input);
  }
}
