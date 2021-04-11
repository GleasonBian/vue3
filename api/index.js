// 引入 封装请求
import fetch from './fetch'
/**
 * 登录
 */
export const login = (data) => fetch('login', data, 'post')
