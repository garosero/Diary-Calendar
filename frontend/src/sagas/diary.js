import { all, call, fork, put, takeEvery,takeLatest } from "redux-saga/effects";
import {
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_SUCCESS,
  ADD_DIARY_REQUEST,ADD_DIARY_SUCCESS,ADD_DIARY_FAILURE, addDiaryRequest
} from '../reducers/diary';
import {uploadImageAPI, addDiaryAPI} from '../lib/api/diary';

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
        error : e,
      })
  }
}

function* watchUploadImages(){
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImage);
}

function* watchAddDiary(){
  yield takeEvery(ADD_DIARY_REQUEST,addDiary);
}

export default function* diarySaga() {
  yield all([
      fork(watchUploadImages),
      fork(watchAddDiary),
  ]);
}
