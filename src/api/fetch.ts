import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
const {
	NODE_ENV, // 环境变量
	VUE_APP_ENV, // 环境标识
	VUE_APP_URL // 业务标识
} = process.env;

// 是否为生产模式
const IS_PROD = NODE_ENV === 'production';
const baseurl = IS_PROD ? VUE_APP_ENV : VUE_APP_URL;

let loadingInstance: any = null;

// 创建一个独立的axios实例
const fetch: any = axios.create({
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
fetch.interceptors.request.use((config: any) => {
	loadingInstance = ElLoading.service({ fullscreen: true, text: '拼命加载中' });
	// 自定义header，可添加项目token
	config.headers.token = 'token';

	return config;
});

// 响应拦截
fetch.interceptors.response.use(
	(response: any) => {
		loadingInstance.close();

		return response;
	},
	() => {
		ElMessage.error('网络请求异常，请稍后重试!');
	}
);

export default fetch;
