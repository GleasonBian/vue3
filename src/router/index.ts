import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// 覆盖上一次提交
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		meta: {
			title: '系统首页'
		},
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		meta: {
			title: '关于我们'
		},
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
