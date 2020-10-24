import { call, put } from 'redux-saga/effects';
import {stateLoading, finishLoading} from '../modules/loading';

export default function createRequestSaga(type, request){
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action){
        yield put(startLoading(type)); //로딩 시작 //put : 액션 디스패치시키는 함수
        try {
            const response = yield call(requset, action.payload); //api call
            yield put({
                type:SUCCESS,
                payload: response.data,
            })
        } catch(e){
            yield put({
                type:FAILURE,
                payload : state = {
                error : true,
                }
                
            });
        }
        yield put(finishLoading(type)); //로딩 끝
    }
}