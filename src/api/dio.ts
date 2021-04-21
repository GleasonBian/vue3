/*
 * @Description:
 * @Author: Gleason
 * @Date: 2021-04-13 16:56:39
 * @LastEditors: Gleason
 * @LastEditTime: 2021-04-21 14:32:32
 */
import Dio from './axios';
import CodeHandle from './code';
interface Resonse {
	// `data` 由服务器提供的响应
	data: any;
	// `status` 来自服务器响应的 HTTP 状态码
	status: number;
	// `statusText` 来自服务器响应的 HTTP 状态信息
	statusText: string;
	// `headers` 服务器响应的头
	headers: any;
	// `config` 是为请求提供的配置信息
	config: any;
	request: any;
}
interface Request {
	situation: string[];
	dio: (
		method?: string,
		url?: string,
		param?: any,
		allData?: boolean,
		config?: any
	) => void;
}
class Request {
	constructor() {
		this.situation = ['put', 'post', 'patch', 'delete'];
		this.dio = (
			method = 'post',
			url = '',
			params = {},
			allData = true,
			config = {}
		) => {
			return new Promise((resolve, reject) => {
				Dio({
					method,
					url,
					data: this.situation.includes(method) ? params : {},
					params: method === 'get' ? params : {},
					...config
				})
					.then((res: Resonse) => {
						CodeHandle(res.data);
						resolve(allData ? res : res.data.data);
					})
					.catch((err: any) => {
						reject(err);
					});
			});
		};
	}
	// url = '', params: any = {}, allData = false, RESTful = false
	get = (...args: any) => {
		return this.dio(...args);
	};

	post = (url = '', params: any = {}, allData = false, RESTful = false) => {
		return this.dio('post', url, params, allData);
	};

	put = (url = '', params: any = {}, allData = false, RESTful = false) =>
		this.dio('put', url, params, allData);

	delete = (url = '', params: any = {}, allData = false, RESTful = false) =>
		this.dio('delete', url, params, allData);

	paramsHandle(method: string, url: string, params: any) {
		const urlE = params.id ? url + '/' + params.id : url;
		const QsParamsE = JSON.stringify(params.data ?? params);
		let Url: string = url,
			QSParams: any = params;
		if (this.situation.includes(method)) {
			QSParams = QsParamsE;
			Url = method === 'post' ? url : urlE;
		}

		if (method === 'get') {
			Url = urlE;
			QSParams = QSParams.data;
		}

		console.log({
			method,
			url: Url,
			data: this.situation.includes(method) ? params : {},
			params: method === 'get' ? QSParams : {}
		});
	}
}
export default new Request();
