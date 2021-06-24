/* eslint-disable */

declare module '*.vue' {
	import Vue from 'vue';
	import VueRouter, { Route } from 'vue-router';
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
declare module 'vue/types/vue' {
	interface Vue {
		$router: VueRouter; // 这表示this下有这个东西
		$route: Route;
	}
}
declare module '*.js';
