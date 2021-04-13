/*
 * @Description:
 * @Author: Gleason
 * @Date: 2021-04-13 16:56:39
 * @LastEditors: Gleason
 * @LastEditTime: 2021-04-13 19:13:50
 */
import Fetch from './fetch';

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
	url: string;
	params: any;
	method: string;
	allData: boolean;
	fetch: (
		url?: string,
		param?: any,
		method?: string,
		allData?: boolean
	) => void;
}
class Request {
	constructor() {
		// 创建axios实例
		this.fetch = (url, param = {}, method = 'post', allData = true) =>
			new Promise((resolve, reject) => {
				Fetch[method](url, param)
					.then((res: Resonse) => {
						resolve(allData ? res : res.data);
					})
					.catch((err: any) => {
						reject(err);
					});
			});
	}
	get(url = '', params: any = {}, allData = false) {
		let getUrlStr = params.id ? url + '/' + params.id : url;
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
		return this.fetch(getUrlStr, null, 'get', allData);
	}
	post(url = '', params: any = {}, allData = false) {
		const postParm = JSON.stringify(params);
		this.fetch(url, postParm);
		return this.fetch(url, postParm, 'post', allData);
	}
	put(url = '', params: any = {}, allData = false) {
		const _url = params.id ? url + '/' + params.id : url;
		const putParams = JSON.stringify(params.data || params);
		return this.fetch(_url, putParams, 'put', allData);
	}
	delete(url = '', params: any = {}, allData = false) {
		const _url = params.id ? url + '/' + params.id : url;
		const deleteParam = JSON.stringify(params.data);
		return this.fetch(_url, deleteParam, 'delete', allData);
	}
}
export default new Request();
