/* eslint-disable */
declare module '*.vue' {
	import Vue from 'vue';
	import VueRouter, { Route } from 'vue-router';
	import type { DefineComponent } from 'vue';
	const component: ReturnType<typeof defineComponent> & {
		install(app: App): void;
	};
	export default component;
}

// 覆盖 上一次提交

declare module 'vue/types/vue' {
	// 这表示this下有这个东西
	interface Vue {
		$router: VueRouter;
		$route: Route;
	}
}

declare module '*.js';
