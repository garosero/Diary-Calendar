import { all, put, fork,takeLatest, takeEvery, take, call,delay } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
} from "../reducers/user";
import { loginAPI, signUpAPI, logOutAPI, loadAPI } from '../lib/api/auth';
import axios from 'axios';
 
function* signUp(action){
  console.log(`signup : ${action.data.userId} ${action.data.password}`)
  try{
    yield call(signUpAPI,action.data);
    yield put({
      type : SIGN_UP_SUCCESS,
    });
  }catch(e){
    console.error(e);
    yield put({
      type : SIGN_UP_FAILURE,
    });
  }
}


function* login(action) {
  console.log('saga : '+action.data);
  try {
    yield call(loginAPI,action.data);
    yield put({ //put은 dispatch와 동일. 로그인 요청 보내고 성공하면 이 줄 실행됨. 
      type: LOG_IN_SUCCESS,
    });
    
  } catch (e) {
    console.error(e);
    yield put({
        type:LOG_IN_FAILURE,
        error : err.response.data,
    })
  }
}

function* load(action){
  try{
    const loadData = yield call(loadAPI);
    yield put({
      type : LOAD_MY_INFO_SUCCESS,
    })
  } catch(e){
    console.error(e);
    yield put({
      type : LOAD_MY_INFO_FAILURE,
    })
  }
}

function* logOut(action){
  console.log('logout');
  try{
    yield call(logOutAPI);
    yield put({
      type : LOG_OUT_SUCCESS,
    });
    sessionStorage.removeItem('me'); //sessionStorage.clear()
  } catch(e){
    yield put({
      type : LOG_OUT_FAILURE,
    });
  }
}

/**
 * saga가 LOG_IN 액션이 들어오는지를 기다림. 
 * 들어왔다면 loginAPI로 요청 
 */
function* watchLogin() {
  console.log('login request');
  yield takeLatest(LOG_IN_REQUEST, login);
  // while(true){
  //   yield take(LOG_IN);
  //   yield put({
  //     type : LOG_IN_SUCCESS,
  //   })  
 //}
}

function* watchLogout(){
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp(){
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function* watchLoad(){
  yield takeLatest(LOAD_MY_INFO_REQUEST, load);
}

export default function* userSaga() {
  yield all([ //all은 여러 이펙트를 동시에 실행할 수 있도록
   fork(watchLogin),
   fork(watchSignUp),
   fork(watchLogout),
   fork(watchLoad),
  ])
  //yield helloSaga()
}



