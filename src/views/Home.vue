<!--
 * @Description:
 * @Author: Gleason
 * @Date: 2021-04-14 11:52:20
 * @LastEditors: Gleason
 * @LastEditTime: 2022-03-20 01:02:21
-->
<template>
	<div>
		<button @click="sendRequest">发送请求测试</button>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { login } from '@/api/index.js'; // 请求封装

export default class Home extends Vue {
	async sendRequest() {
		const res = await login({ uid: 123123123 }); // 调用接口
		console.log(res); // 输出mock数据
	}
}
</script>
