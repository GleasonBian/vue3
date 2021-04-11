import axios from 'axios';

const {
	NODE_ENV, // 环境变量
	VUE_APP_ENV, // 环境标识
	VUE_APP_URL // 业务标识
} = process.env;
// 是否为生产模式
const IS_PROD = NODE_ENV === 'production';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

console.log('baseUrl:', process.env.VUE_APP_URL); // => 'https://api.apiopen.top/'
console.log('socket:', process.env.VUE_APP_SOCKET);

const baseurl = IS_PROD ? VUE_APP_URL : VUE_APP_ENV;

console.info('proxy:', baseurl);

axios.defaults.baseURL = baseurl;
