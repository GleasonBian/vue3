import axios from 'axios';
const {
	NODE_ENV, // 环境变量
	VUE_APP_ENV, // 环境标识
	VUE_APP_URL // 业务标识
} = process.env;
// 是否为生产模式
const IS_PROD = NODE_ENV === 'production';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.put['Content-Type'] = 'application/json';

const baseurl = IS_PROD ? VUE_APP_ENV : VUE_APP_URL;

console.info('proxy:', baseurl);

axios.defaults.baseURL = baseurl; // 将 baseurl 设置为 axios 的默认 baseURL

interface Resonse {
	// `data` 由服务器提供的响应
	data: any,
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

export default async (url = '', data: any = {}, type = 'post', allData = false) => {

	type = type.toLocaleLowerCase();
	console.log();
	const Dio = (_url?: string, _data?: any) => {
		return new Promise((resolve, reject) => {
			axios[type](_url, _data)
				.then((res: Resonse) => {
					resolve(allData ? res : res.data);
				})
				.catch((err: any) => {
					reject(err);
				});
		});
	};

	if (type === 'get') {
		let getUrlStr = data.id ? (url + '/' + data.id) : url;
		if (data.param) {
			let dataStr: any = [];
			Object.keys(data.param).forEach(key => {
				dataStr.push(key + '=' + data.param[key]);
			});
			if (dataStr.length) {
				dataStr = dataStr.join('&');
				getUrlStr += '?' + dataStr;
			}
		}
		return Dio(getUrlStr);
	}

	if (type === 'post') {
		const postParm = JSON.stringify(data);
		return Dio(url, postParm);
	}

	if (type === 'put') {
		const putUrl = data.id ? (url + '/' + data.id) : url;
		const putParams = JSON.stringify(data.data || data);
		return Dio(putUrl, putParams);
	}

	if (type === 'delete') {
		const deleteUrl = data.id ? (url + '/' + data.id) : url;
		const deleteParam = JSON.stringify(data.data);
		return Dio(deleteUrl, deleteParam);
	}

};
