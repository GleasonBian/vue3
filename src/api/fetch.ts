import Dio from './dio';

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

export default (url = '', params: any = {}, method = 'post', allData = false) => {

	method = method.toLocaleLowerCase();

	const fetch = (_url?: string, _params?: string) => new Promise((resolve, reject) => {
		Dio[method](_url, _params)
			.then((res: Resonse) => {
				resolve(allData ? res : res.data);
			})
			.catch((err: any) => {
				reject(err);
			});
	});

	if (method === 'get') {
		let getUrlStr = params.id ? (url + '/' + params.id) : url;
		if (params.param) {
			let dataStr: any = [];
			Object.keys(params.param).forEach(key => {
				dataStr.push(key + '=' + params.param[key]);
			});
			if (dataStr.length) {
				dataStr = dataStr.join('&');
				getUrlStr += '?' + dataStr;
			}
		}
		return fetch(getUrlStr);
	}

	if (method === 'post') {
		const postParm = JSON.stringify(params);
		return fetch(url, postParm);
	}

	if (method === 'put') {
		const putUrl = params.id ? (url + '/' + params.id) : url;
		const putParams = JSON.stringify(params.data || params);
		return fetch(putUrl, putParams);
	}

	if (method === 'delete') {
		const deleteUrl = params.id ? (url + '/' + params.id) : url;
		const deleteParam = JSON.stringify(params.data);
		return fetch(deleteUrl, deleteParam);
	}

};
