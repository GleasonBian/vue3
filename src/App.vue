<template>
	<el-container id="vue-app">
		<el-header height="70px" style="background-color: #242f42">
			<Header />
		</el-header>
		<el-container id="vue_app_container">
			<el-aside :width="menuWidth">
				<side-bar />
			</el-aside>
			<el-main id="vue_app_main">
				<Tags />
				<router-view class="router-view" v-slot="{ Component }">
					<transition :name="transitionName">
						<component :is="Component" />
					</transition>
				</router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts">
// import { reactive, toRefs } from 'vue';
// import { useRouter } from 'vue-router';
import { mapState } from 'vuex';
import SideBar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import Tags from '@/components/Tags.vue';

export default {
	components: {
		SideBar,
		Header,
		Tags
	},
	computed: {
		...mapState({
			menuWidth: (state: any) => {
				return `${state.menuWidth}px`;
			}
		})
	}
	// setup() {
	// 	const router = useRouter();
	// 	const state = reactive({
	// 		transitionName: 'slide-left'
	// 	});
	// 	router.beforeEach((to: any, from: any) => {
	// 		if (to.meta.index > from.meta.index) {
	// 			state.transitionName = 'slide-left'; // 向左滑动
	// 		} else if (to.meta.index < from.meta.index) {
	// 			// 由次级到主级
	// 			state.transitionName = 'slide-right';
	// 		} else {
	// 			state.transitionName = ''; // 同级无过渡效果
	// 		}
	// 	});

	// 	return {
	// 		...toRefs(state)
	// 	};
	// }
};
</script>

<style lang="less">
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
html,
body {
	height: 100%;
	overflow-x: hidden;
	// overflow-y: scroll;
}

#vue-app {
	height: 100%;
	width: 100%;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	#vue_app_container {
		transition: all 1s;
		#vue_app_main {
			padding: 0px;
			margin: 0px;
			transition: all 1s;
		}
	}
}

// .router-view {
// 	width: 100%;
// 	height: auto;
// 	// position: absolute;
// 	// top: 0;
// 	// bottom: 0;
// 	// margin: 0 auto;
// 	-webkit-overflow-scrolling: touch;
// }

// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
// 	height: 100%;
// 	will-change: transform;
// 	transition: all 500ms;
// 	position: absolute;
// 	backface-visibility: hidden;
// }
// .slide-right-enter {
// 	opacity: 0;
// 	transform: translate3d(-100%, 0, 0);
// }
// .slide-right-leave-active {
// 	opacity: 0;
// 	transform: translate3d(100%, 0, 0);
// }
// .slide-left-enter {
// 	opacity: 0;
// 	transform: translate3d(100%, 0, 0);
// }
// .slide-left-leave-active {
// 	opacity: 0;
// 	transform: translate3d(-100%, 0, 0);
// }

// .van-badge--fixed {
// 	z-index: 1000;
// }
</style>
