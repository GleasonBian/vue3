/*
 * @Description:
 * @Author: Gleason
 * @Date: 2021-04-13 16:56:39
 * @LastEditors: Gleason
 * @LastEditTime: 2021-04-21 14:32:42
 */
// 引入 封装请求
import Dio from './dio';
/**
 * 登录
 */
export const login = param => Dio.post('/login', param);
