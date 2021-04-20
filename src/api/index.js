/*
 * @Description:
 * @Author: Gleason
 * @Date: 2021-04-13 16:56:39
 * @LastEditors: Gleason
 * @LastEditTime: 2021-04-14 14:56:52
 */
// 引入 封装请求
import Dio from './dio';
/**
 * 登录
 */
export const login = param => Dio.get('/login', param);
