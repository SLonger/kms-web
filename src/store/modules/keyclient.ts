import {
	VuexModule,
	Module,
	Action,
	Mutation,
	getModule
} from 'vuex-module-decorators';
import { getProvs, getAppInfo, getHistory, getInfo } from '@/api/keyclient';
import { Message } from 'element-ui';
import store from '@/store';

@Module({ dynamic: true, store, name: 'user' })
class Keyclient extends VuexModule {

	@Mutation
	private SET_TOKEN(token: string) {
	}
	@Action
	public async getProvs() {
		const { data } = await getProvs({});
		return data
	}
	@Action
	public async getAppInfo() {
		const { data } = await getAppInfo({});
		return data
	}
	@Action
	public async getHistory() {
		const { data } = await getHistory({})
		return data
	}
	@Action
	public async getInfo() {
		const { data } = await getInfo({})
		return data
	}
}

export const keyclinetModule = getModule(Keyclient);
