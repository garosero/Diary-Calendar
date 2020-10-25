import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

/**
 * 첫번째 리듀서 모듈
 * Ducks 패턴(액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 다 정의되어 있는 리덕스 모듈 생성)
 */


 /* 액션 타입 */
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';


/* 액션 생성 함수 */
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, //register, login 
        key, //username, password
        value, //실제 바꾸려는 값
    }),
)

export const initializeForm = createAction(INITIALIZE_FORM, form=> form);

export const register = createAction(REGISTER, ({username,password}) => ({
    username,
    password
}))

export const login = createAction(LOGIN,({username,password}) => ({
    username,
    password
}));

//사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga(){
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN,loginSaga);
};

const initialState = {
    register : {
        username : '',
        password : '',
        passwordConfirm : '',
    },
    login : {
        username : '',
        password : '',
    },
    auth : null,
    authError : null,

};

/**디스패치될 때마다 액션과 현재 상태를 받는 단순 함수.... 
 * 여러개의 action을 다루는 single reducer 
 * action type(first parameter)이 key,  reducer or reducer map(second)이 values인 map 
 */
const auth = handleActions( //(reducerMap, defaultStage)
    {   //파라미터로 전달받은 값을 액션의 payload로 설정 
        [CHANGE_FIELD] : (state, {payload : {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value; //예 : state.register.username을 바꾼다.
            }),
        [INITIALIZE_FORM]: (state, { payload : form }) => ({
            ...state,
            [form] : initialState[form],
            authError : null, //폼 전환 시 회원 인증 에러 초기화
        }),
        //회원가입 성공
        [REGISTER_SUCCESS] : (state, {payload : auth}) => ({
            ...state,
            authError : null,
            auth,
        }),
        //회원가입 실패
        [REGISTER_FAILURE] : (state, {payload : error}) => ({
            ...state,
            authError : error,
        }),

        //로그인 성공
        [LOGIN_SUCCESS] : (state, {payload : auth}) => ({
            ...state,
            authError : null,
            auth,
        }),
        //로그인 실패
        [LOGIN_FAILURE]:(state, {payload : error}) => ({
            ...state,
            authError : error,
        })
    },
    initialState,
);

export default auth;