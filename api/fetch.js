import axios from 'axios'
const {
	NODE_ENV, // 环境变量
	VUE_APP_ENV, // 环境标识
	VUE_APP_URL, // 业务标识
} = process.env
// 是否为生产模式
const IS_PROD = NODE_ENV === 'production'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

console.log('baseUrl:', process.env.VUE_APP_URL) // => 'https://api.apiopen.top/'
console.log('socket:', process.env.VUE_APP_SOCKET)

const baseurl = IS_PROD ? VUE_APP_URL : VUE_APP_ENV

console.info('proxy:', baseurl)

axios.defaults.baseURL = baseurl // 将 baseurl 设置为 axios 的默认 baseURL
/**
 * 下面 是 axios 封装的 请求
 * 采用 es6 promise 和 async await 方式
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (url = '', data = {}, type = 'POST') => {
	type = type.toUpperCase()

	if (type === 'GET') {
		// 请求参数 拼接字符串

		// eslint-disable-next-line no-self-assign
		data.id ? (url = url + '/' + data.id) : (url = url)
		if (data.param) {
			let dataStr = []
			Object.keys(data.param).forEach((key) => {
				dataStr.push(key + '=' + data.param[key])
			});
			if (dataStr.length) {
				dataStr = dataStr.join('&')
				url += '?' + dataStr
			}
		}

		return new Promise((resolve, reject) => {
			axios
				.get(url)
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				});
		})
	}

	if (type === 'POST') {
		return new Promise((resolve, reject) => {
			data = JSON.stringify(data)
			console.log(data)
			axios
				.post(url, data)
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				});
		})
	}
	if (type === 'PUT') {
		// eslint-disable-next-line no-self-assign
		data.id ? (url = url + '/' + data.id) : (url = url)
		return new Promise((resolve, reject) => {
			data = JSON.stringify(data.data || data)
			axios
				.put(url, data)
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				});
		})
	}
	if (type === 'DELETE') {
		data.id ? (url = url + '/' + data.id) : (url = url)
		return new Promise((resolve, reject) => {
			data = JSON.stringify(data.data)
			axios
				.delete(url, data)
				.then((res) => {
					console.log(res)
					resolve(res)
				})
				.catch((err) => {
					console.log(err)
					reject(err)
				});
		})
	}
}
