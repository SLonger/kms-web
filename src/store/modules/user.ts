import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import { login, logout, sign, userquery } from '@/api/users';
import { getToken, setToken, removeToken } from '@/utils/cookies';
import store from '@/store';
import { format } from 'path';
import { register } from 'register-service-worker';

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
}

interface UserinfoState {
  account: string;
  password?: string;
  role?: string;
  name?: string;
  gender?: string;
  department?: string;
  email?: string;
  telephone?: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || '';
  public name = '';
  public avatar = '';
  public introduction = '';
  public roles: string[] = [];

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction;
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles;
  }

  @Action // 登陆
  public async Login(userInfo: { account: string; password: string }) {
    let { account, password } = userInfo;
    account = account.trim();
    const { data } = await login({ account, password });

    console.log('login resp data: ', data);
    setToken(data.data.token);
    this.SET_TOKEN(data.data.token);
  }

  @Action // 注册
  public async Register(userInfo: UserinfoState) {
    userInfo.account = userInfo.account.trim();
    const { data } = await sign(userInfo);
  }

  @Action // 用户查询
  public async Userquery(userinfo: { allAccount: boolean }) {
    const { data } = await userquery(userinfo);
    return data;
  }

  @Action
  public ResetToken() {
    removeToken();
    this.SET_TOKEN('');
    this.SET_ROLES([]);
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!');
    }
    await logout();
    removeToken();
    this.SET_TOKEN('');
    this.SET_ROLES([]);
  }
}

export const UserModule = getModule(User);
