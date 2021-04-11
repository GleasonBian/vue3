// 引入 封装请求
import fetch from './fetch';
/**
 * 登录
 */
export const login = param => fetch('login', param, 'post');
