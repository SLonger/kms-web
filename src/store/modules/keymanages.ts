import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import { provkeys } from '@/api/keymanages';
import { Message } from 'element-ui';
import store from '@/store';
import { format } from 'path';
import { register } from 'register-service-worker';
import { promises } from 'fs';

export interface KeyManageState {
  account?: string;
}

@Module({ dynamic: true, store, name: 'keymanage' })
class Keymanage extends VuexModule implements KeyManageState {
  public account = '';

  @Mutation
  private SET_INTRODUCTION(account: string) {
    this.account = account;
  }

  @Action // 查询所有省份密钥
  public async Provkeys() {
    const { data } = await provkeys('{}');
    return data;
  }
}

export const KeyManageModule = getModule(Keymanage);
