import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

/**
 * 첫번째 리듀서 모듈
 * Ducks 패턴(액션 타입, 액션 생성 함수, 리듀서가 하나의 파일에 다 정의되어 있는 리덕스 모듈 생성)
 */


 /* 액션 타입 */
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

/* 액션 생성 함수 */
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, //login
        key, //username, password
        value, //실제 바꾸려는 값
    }),
)

export const initializeForm = createAction(INITIALIZE_FORM, form=> form);

const initialState = {
    login : {
        username : '',
        password : '',
    }

};


const auth = handleActions(
    {   //파라미터로 전달받은 값을 액션의 payload로 설정 
        [CHANGE_FIELD] : (state, {payload : {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value; //예 : state.register.username을 바꾼다.
            }),
        [INITIALIZE_FORM]: (state, { payload : form }) => ({
            ...state,
            [form] : initialState[form],
        })
    },
    initialState,
);

export default auth;