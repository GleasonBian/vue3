// 业务接口状态码
interface Res {
	code: number;
	data: any;
	message: string;
}
const CodeHandle = (res: Res) => {
	const { code } = res;
	switch (code) {
		case 404:
			console.log('进入404页面');
			break;
		case 500:
			console.log('服务错误');
			break;
		default:
			console.log('服务错误');
			break;
	}
};

export default CodeHandle;
