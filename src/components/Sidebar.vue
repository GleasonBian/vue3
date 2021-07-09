<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			:collapse="collapse"
			background-color="#324157"
			text-color="#bfcbd9"
			active-text-color="#20a0ff"
			unique-opened
			router
		>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template #title>
							<i :class="item.icon"></i>
							<span>{{ item.title }}</span>
						</template>

						<template v-for="subItem in item.subs">
							<el-submenu
								v-if="subItem.subs"
								:index="subItem.index"
								:key="subItem.index"
							>
								<template #title>{{ subItem.title }}</template>
								<el-menu-item
									v-for="(threeItem, i) in subItem.subs"
									:key="i"
									:index="threeItem.index"
									>{{ threeItem.title }}</el-menu-item
								>
							</el-submenu>
							<el-menu-item
								v-else
								:index="subItem.index"
								:key="subItem.index"
								>{{ subItem.title }}</el-menu-item
							>
						</template>
					</el-submenu>
				</template>

				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i :class="item.icon"></i>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { reactive } from 'vue';

interface MainMenu {
	icon: string;
	index: string;
	title: string;
	subs?: SubMenu[];
}
interface SubMenu {
	index: string;
	title: string;
}

@Options({
	computed: {
		onRoutes() {
			return this.$route.path.replace('/', '');
		},
		collapse() {
			return this.$store.state.collapse;
		}
	},
	methods: {},
	components: {}
})
export default class SideBar extends Vue {
	// 响应式状态
	items: any = reactive<MainMenu[]>([
		{
			icon: 'el-icon-camera-solid',
			index: '/',
			title: '系统首页'
		},
		{
			icon: 'el-icon-camera',
			index: 'table',
			title: '基础表格'
		},
		{
			icon: 'el-icon-video-camera-solid',
			index: 'tabs',
			title: 'tab选项卡'
		},
		{
			icon: 'el-icon-video-camera',
			index: '3',
			title: '表单相关',
			subs: [
				{
					index: 'form',
					title: '基本表单'
				},
				{
					index: 'upload',
					title: '文件上传'
				}
			]
		},
		{
			icon: 'el-icon-message-solid',
			index: 'icon',
			title: '自定义图标'
		},
		{
			icon: 'el-icon-bell',
			index: 'charts',
			title: 'schart图表'
		},
		{
			icon: 'el-icon-s-order',
			index: 'i18n',
			title: '国际化功能'
		},
		{
			icon: 'el-icon-s-platform',
			index: '7',
			title: '错误处理',
			subs: [
				{
					index: 'permission',
					title: '权限测试'
				},
				{
					index: '404',
					title: '404页面'
				}
			]
		},
		{
			icon: 'el-icon-s-fold',
			index: '/donate',
			title: '支持作者'
		}
	]);
}
</script>

<style scoped>
.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
	width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}
.sidebar > ul {
	height: 100%;
}
</style>
