import {combineReducers } from 'redux';
import auth, {authSaga} from './auth';
import {all} from 'redux-saga/effects';
import loading from './loading';

/** 루트 리듀서 */

const rootReducer = combineReducers({
    auth,
    loading,
});

export function* rootSaga(){
    yield all([authSaga()]);
}

export default rootReducer;

