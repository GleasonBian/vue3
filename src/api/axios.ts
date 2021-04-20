/*
 * @Description:
 * @Author: Gleason
 * @Date: 2021-04-14 11:52:20
 * @LastEditors: Gleason
 * @LastEditTime: 2021-04-14 13:39:58
 */
import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
const {
	NODE_ENV, // 环境变量
	VUE_APP_ENV, // 业务标识
	VUE_APP_URL // 环境标识
} = process.env;

// 是否为生产模式
const IS_PROD = NODE_ENV === 'production';
const baseurl = IS_PROD ? VUE_APP_URL : VUE_APP_ENV;
console.log('baseurl', baseurl);
let loadingInstance: any = null;

// 创建一个独立的axios实例
const Dio: any = axios.create({
	// 设置baseUr地址,如果通过proxy跨域可直接填写base地址
	baseURL: baseurl,
	// 定义统一的请求头部
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	},
	// 配置请求超时时间
	timeout: 10000
});

// 请求拦截
Dio.interceptors.request.use((config: any) => {
	loadingInstance = ElLoading.service({ fullscreen: true, text: '拼命加载中' });
	// 自定义header，可添加项目token
	config.headers.token = 'token';

	return config;
});

// 响应拦截
Dio.interceptors.response.use(
	(response: any) => {
		loadingInstance.close();
		return response;
	},
	() => {
		loadingInstance.close();
		ElMessage.error('网络请求异常，请稍后重试!');
	}
);

export default Dio;
