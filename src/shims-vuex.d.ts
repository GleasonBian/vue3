/* eslint-disable */

import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

// 覆盖上一次提交
declare module '@vue/runtime-core' {
	// 声明自己的 store state
	interface State {
		menuWidth: number;
	}

	// 为 `this.$store` 提供类型声明
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
