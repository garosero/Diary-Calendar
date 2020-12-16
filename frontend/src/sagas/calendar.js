import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {LOAD_CALENDAR_EVENTS_REQUEST,LOAD_CALENDAR_EVENTS_FAILURE,LOAD_CALENDAR_EVENTS_SUCCESS,LOAD_CALENDAR_LIST_FAILURE,LOAD_CALENDAR_LIST_REQUEST,LOAD_CALENDAR_LIST_SUCCESS} from '../reducers/calendar';
import {calendarAPI, calendarListAPI} from '../lib/api/calendar';

function* loadCalendar(action){
    try{
        const result = yield call(calendarAPI,action.data);
        yield put({
            type : LOAD_CALENDAR_EVENTS_SUCCESS,
            data : result.data
        })

    }catch(e){
        console.error(e);
        yield put({
            type : LOAD_CALENDAR_EVENTS_FAILURE
        })
    }

}


function* loadCalendarList(action){
    try {
        const result = yield call(calendarListAPI);
        yield put({
            type: LOAD_CALENDAR_LIST_SUCCESS,
            data : result.data
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_CALENDAR_LIST_FAILURE
        })
    }
}

function* watchloadCalendar() {
  yield takeLatest(LOAD_CALENDAR_EVENTS_REQUEST, loadCalendar);
}

function* watchloadCalendarList(){
    yield takeLatest(LOAD_CALENDAR_LIST_REQUEST,loadCalendarList);
}


export default function* calendarSaga(){
    yield all([
        fork(watchloadCalendar),
        fork(watchloadCalendarList),
    ]);
}