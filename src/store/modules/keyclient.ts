import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import {
  getProvs,
  getAppInfo,
  getHistory,
  getInfo,
  getrecords,
  updateclientInfo
} from '@/api/keyclient';
import { Message } from 'element-ui';
import store from '@/store';

@Module({ dynamic: true, store, name: 'user' })
class Keyclient extends VuexModule {
  @Mutation
  private SET_TOKEN(token: string) {}
  @Action
  public async getProvs() {
    const { data } = await getProvs({});
    return data;
  }
  @Action
  public async getAppInfo(datascrope: any) {
    const { data } = await getAppInfo(datascrope);
    return data;
  }
  @Action
  public async getHistory(datascrope: any) {
    const { data } = await getHistory(datascrope);
    return data;
  }
  @Action
  public async getInfo(datascrope: any) {
    const { data } = await getInfo(datascrope);
    return data;
  }

  @Action
  public async getrecords() {
    const { data } = await getrecords({});
    return data;
  }

  @Action
  public async UpdateclientInfo(datascrope: any) {
    const { data } = await updateclientInfo(datascrope);
    return data;
  }
}

export const keyclinetModule = getModule(Keyclient);
