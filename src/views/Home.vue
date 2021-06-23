<!--
 * @Description:
 * @Author: Gleason
 * @Date: 2021-04-14 11:52:20
 * @LastEditors: Gleason
 * @LastEditTime: 2021-04-21 14:33:43
-->
<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<button @click="sendRequest">发送请求测试</button>
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { login } from '@/api/index.js';

@Options({
	methods: {},
	components: {
		HelloWorld
	}
})
export default class Home extends Vue {
	async sendRequest() {
		const res = await login({ uid: 123123123 });
		console.log(res);
	}
}
</script>
