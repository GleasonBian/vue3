const path = require('path');
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
// mock 数据插件
const MockjsWebpackPlugin = require('mockplugin');
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
				path: path.join(__dirname, './mock'),
				port: 9007
			})
		);
	}
	return plugins;
}
module.exports = {
	// 生产环境是否开启 sourcemap
	productionSourceMap: false,

	// 是否自动开启eslint 检查
	lintOnSave: !IS_PROD,

	// 输出文件是否使用哈希
	filenameHashing: true,

	// 文件输出目录
	outputDir: 'dist',

	// 如果机器有超过1个内核，则在默认情况下为生产构建中的 babel 和 ts 使用线程加载器
	parallel: require('os').cpus().length > 1,

	configureWebpack: {
		// 覆盖webpack默认配置的都在这里
		resolve: {
			// 配置解析别名其中:@代表根目录，@c代表 src/components 文件夹，等
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@a': path.resolve(__dirname, './src/assets'),
				'@c': path.resolve(__dirname, './src/components')
			}
		},
		plugins: pluginsConfig()
	},
	// 代理服务
	devServer: {
		overlay: {
			warnings: false,
			errors: true
		},
		compress: true,
		open: true, // 启动时 是否 打开浏览器
		host: VUE_APP_HOST, // 域名
		port: VUE_APP_PORT, // 端口号
		https: false, // local.jd.com 是否使用 https 协议
		proxy: {
			// 主域名
			[VUE_APP_ENV]: {
				secure: false, // 使用的是 http 协议则设置为false，https 协议则设置为 true
				ws: false, // 是否启用websockets
				target: VUE_APP_URL, // 代理目标
				changeOrigin: true, // 覆盖主机头来源
				pathRewrite: {
					['^/' + VUE_APP_ENV]: ''
				}
			}
		}
	}
};
