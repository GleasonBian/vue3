/* eslint-disable */

import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
	tagsList: any;
	collapse: boolean;
	menuWidth: number;
}
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		tagsList: [],
		collapse: false,
		menuWidth: 250
	},
	mutations: {
		delTagsItem(state: any, data: any) {
			state.tagsList.splice(data.index, 1);
		},
		setTagsItem(state: any, data: any) {
			state.tagsList.push(data);
		},
		clearTags(state: any) {
			state.tagsList = [];
		},
		closeTagsOther(state: any, data: any) {
			state.tagsList = data;
		},
		closeCurrentTag(state: any, data: any) {
			for (let i = 0, len = state.tagsList.length; i < len; i++) {
				const item = state.tagsList[i];
				if (item.path === data.$route.fullPath) {
					if (i < len - 1) {
						data.$router.push(state.tagsList[i + 1].path);
					} else if (i > 0) {
						data.$router.push(state.tagsList[i - 1].path);
					} else {
						data.$router.push('/');
					}
					state.tagsList.splice(i, 1);
					break;
				}
			}
		},
		// 侧边栏折叠
		hadndleCollapse(state, data) {
			console.log('折叠:', data ? 64 : 250);
			state.menuWidth = data ? 64 : 250;
			state.collapse = data;
		}
	},
	actions: {},
	modules: {}
});

export function useStore() {
	return baseUseStore(key);
}
