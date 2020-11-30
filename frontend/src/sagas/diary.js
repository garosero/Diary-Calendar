import { all, call, fork, put, takeEvery,takeLatest } from "redux-saga/effects";
import {
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_FAILURE, UPLOAD_IMAGES_SUCCESS
} from '../reducers/diary';
import {uploadImageAPI} from '../lib/api/diary';

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

function* watchUploadImages(){
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImage);
}

export default function* diarySaga() {
  yield all([
      fork(watchUploadImages),
  ]);
}
