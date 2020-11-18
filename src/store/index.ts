import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/app';
import { IUserState } from './modules/user';
import { KeyManageState } from './modules/keymanages';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  user: IUserState;
  keymanage: KeyManageState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
