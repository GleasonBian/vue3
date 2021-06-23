import { join, resolve as _resolve } from 'path';
import OS from 'os';
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
// mock 数据插件
import MockjsWebpackPlugin from 'mockplugin';
// 代码上传插件
import WebpackScpUploadPlugin from 'webpack-scp-upload-plugin';

const {
	NODE_ENV, // 环境变量
	VUE_APP_ENV, // 环境标识
	VUE_APP_OFFICIAL, // 准生产环境
	VUE_APP_TMGI, // 业务标识
	VUE_APP_HOST, // 项目运行 域名
	VUE_APP_PORT, // 项目运行 端口
	VUE_APP_URL // 接口域名
	// VUE_APP_TITLE, // 网页标题
	// VUE_APP_STATIC_HOST, // 静态文件域名
	// VUE_APP_DIR, // 静态文件二级文件夹
} = process.env;
const SERVER_FILE_PATH = `/usr/local/nginx/html/${VUE_APP_TMGI}`;
// 是否为生产模式
const IS_PROD = NODE_ENV === 'production';

// 是否为 mock 环境
const IS_MOCK = VUE_APP_ENV === 'mock';

// 是否为 准生产 环境
const IS_OFFICIAL = Boolean(
	VUE_APP_OFFICIAL !== undefined && VUE_APP_OFFICIAL === 'true'
);

console.log(
	'-----------------------------overview-----------------------------'
);
console.log('当前模式:', NODE_ENV);
console.log('环境标识:', VUE_APP_ENV);
console.log('接口域名:', VUE_APP_URL);
if (IS_PROD) {
	VUE_APP_OFFICIAL !== undefined &&
		console.log('是准生产:', IS_OFFICIAL ? '是' : '否');
	console.log('业务标识:', IS_OFFICIAL ? '无' : VUE_APP_TMGI);
} else {
	console.log('运行域名:', `${VUE_APP_HOST}:${VUE_APP_PORT}`);
}
console.log(
	'-----------------------------overview-----------------------------'
);
// 插件配置
function pluginsConfig() {
	const plugins = [];
	if (IS_MOCK) {
		plugins.push(
			new MockjsWebpackPlugin({
				path: join(__dirname, './mock'),
				port: 9090
			})
		);
	}
	if (IS_PROD) {
		plugins.push(
			new WebpackScpUploadPlugin({
				host: '8.142.29.231',
				password: 'gleason0.0.',
				local: 'dist',
				path: SERVER_FILE_PATH
			})
		);
	}
	return plugins;
}
export const publicPath = IS_PROD ? './' : '/';
export const productionSourceMap = false;
export const lintOnSave = !IS_PROD;
export const filenameHashing = true;
export const outputDir = 'dist';
export const parallel = OS.cpus().length > 1;

export const configureWebpack = {
	// 覆盖webpack默认配置的都在这里
	resolve: {
		// 配置解析别名其中:@代表根目录，@c代表 src/components 文件夹，等
		alias: {
			'@': _resolve(__dirname, './src'),
			'@a': _resolve(__dirname, './src/assets'),
			'@c': _resolve(__dirname, './src/components')
		}
	},
	plugins: pluginsConfig()
};
export const devServer = {
	overlay: {
		warnings: false,
		errors: true
	},
	compress: true,
	open: true,
	host: VUE_APP_HOST,
	port: VUE_APP_PORT,
	https: false,
	proxy: {
		// 主域名
		[VUE_APP_ENV]: {
			secure: false,
			ws: false,
			target: VUE_APP_URL,
			changeOrigin: true,
			pathRewrite: {
				[`^/${VUE_APP_ENV}`]: ''
			}
		}
	}
};
