/*
 * @Description:
 * @Author: Gleason
 * @Date: 2021-04-13 16:56:39
 * @LastEditors: Gleason
 * @LastEditTime: 2021-04-21 14:42:58
 */
import dio from './dio';
/**
 * 登录
 */
export const login = param => dio.post('/login', param);
