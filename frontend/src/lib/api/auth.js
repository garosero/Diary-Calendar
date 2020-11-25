//import client from './client';
import axios from 'axios';

/**
 * auth 관련 api 함수
 */

//로그인
export const loginAPI = ({userId, password}) => {
    return axios.post('/api/user/login',{userId,password});
}

//새로고침 후 다시 로그인 정보 불러오기
export const loadAPI = () => {
    return axios.get('/api/user/check');
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

