import { all, call, fork, put, takeEvery,takeLatest } from "redux-saga/effects";
import {
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_SUCCESS,
  ADD_DIARY_REQUEST,ADD_DIARY_SUCCESS,ADD_DIARY_FAILURE, 
  LOAD_DIARY_REQUSET, LOAD_DIARY_FAILURE, LOAD_DIARY_SUCCESS
} from '../reducers/diary';
import {uploadImageAPI, addDiaryAPI, loadDiaryAPI} from '../lib/api/diary';
import { LOAD_MY_INFO_FAILURE } from "../reducers/user";
import { calendarAPI } from "../lib/api/auth";

function* uploadImage(action){
  console.log(action.data);
  try{
    const result = yield call(uploadImageAPI, action.data); //서버로부터 받는 응답
    yield put({
      type : UPLOAD_IMAGES_SUCCESS,
      data : result.data, //서버로부터 저장된 이미지 주소를 받아온다. 그걸 이용해 이미지 미리보기 할 수 있음. 
    });
  }catch(e){
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
    })
  }
}

function* addDiary(action){
  try {
    const result = yield call(addDiaryAPI,action.data);
    yield put({
      type:ADD_DIARY_SUCCESS,
      data : result.data,
    });
  } catch (error) {
      yield put({
        type : ADD_DIARY_FAILURE,
        error : error,
      })
  }
}

function* loadDiary(action){
  try{
    //coc ddzzanst result = yield call(loadDiaryAPI, action.data);
    const result = yield call(calendarAPI,action.data);
    console.log('diary : '+diary);
    console.log('action.data : '+action.data);
    console.log('loadDiary');
    console.log(result);
    yield put({
      type : LOAD_DIARY_SUCCESS,
      data : result.data
    })
  }catch(e){
    yield put({
      type : LOAD_DIARY_FAILURE,
      error :e, 
    })
  }
}

function* watchUploadImages(){
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImage);
}

function* watchAddDiary(){
  yield takeLatest(ADD_DIARY_REQUEST,addDiary);
}

function* watchloadDiary(){
  yield takeLatest(LOAD_DIARY_REQUSET,loadDiary);
}

export default function* diarySaga() {
  yield all([
      fork(watchUploadImages),
      fork(watchAddDiary),
      fork(watchloadDiary)
  ]);
}
