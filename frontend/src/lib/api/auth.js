//import client from './client';
import axios from 'axios';

/**
 * auth 관련 api 함수
 */

//로그인
export const loginAPI = ({userId, password}) => {
    return axios.post('/api/user/login',{userId,password});
}

//회원 가입
export const signUpAPI = ({userId, password}) => {
    return axios.post('/api/user/signup', {userId,password});
}

export const logOutAPI = () => {
    return axios.post('/api/user/logout');
}
//로그인 상태 확인
export const check = () => client.get('/api/auth/check');

