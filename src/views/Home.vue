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
	methods: {
		async sendRequest() {
			const res = await login();
			console.log(res);
		}
	},
	components: {
		HelloWorld
	}
})
export default class Home extends Vue {}
</script>
