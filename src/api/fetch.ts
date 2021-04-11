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

axios.defaults.baseURL = baseurl; // 将 baseurl 设置为 axios 的默认 baseURL

interface Resonse {
	// `data` 由服务器提供的响应
  data:any,
	// `status` 来自服务器响应的 HTTP 状态码
  status: number,
	// `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: string,
	// `headers` 服务器响应的头
  headers: any,
	// `config` 是为请求提供的配置信息
  config: any,
  request: any
}

export default async (url = '', data:any = {}, type = 'POST') => {
	type = type.toUpperCase();

	if (type === 'GET') {
		// 请求参数 拼接字符串
		data.id ? (url = url + '/' + data.id) : url;
		if (data.param) {
			let dataStr:any = [];
			Object.keys(data.param).forEach(key => {
				dataStr.push(key + '=' + data.param[key]);
			});
			if (dataStr.length) {
				dataStr = dataStr.join('&');
				url += '?' + dataStr;
			}
		}

		return new Promise((resolve, reject) => {
			axios
				.get(url)
				.then((res:Resonse) => {
					resolve(res);
				})
				.catch((err:any) => {
					reject(err);
				});
		});
	}

	if (type === 'POST') {
		return new Promise((resolve, reject) => {
			data = JSON.stringify(data);
			console.log(data);
			axios
				.post(url, data)
				.then((res:Resonse) => {
					resolve(res);
				})
				.catch((err:any) => {
					reject(err);
				});
		});
	}
	if (type === 'PUT') {
		data.id ? (url = url + '/' + data.id) : url;
		return new Promise((resolve, reject) => {
			data = JSON.stringify(data.data || data);
			axios
				.put(url, data)
				.then((res:Resonse) => {
					resolve(res);
				})
				.catch((err:any) => {
					reject(err);
				});
		});
	}
	if (type === 'DELETE') {
		data.id ? (url = url + '/' + data.id) : url;
		return new Promise((resolve, reject) => {
			data = JSON.stringify(data.data);
			axios
				.delete(url, data)
				.then((res:Resonse) => {
					console.log(res);
					resolve(res);
				})
				.catch((err:any) => {
					console.log(err);
					reject(err);
				});
		});
	}
};
