import { handleActions } from "redux-actions";

export const initialState = {
  diaries: [
    {
      User: null,
      title: "",
      content : "",
      img: ""
    }, //화면에 보일 포스트들
  ],
  addDiaryErrorReason : false, // 포스트 업로드 실패 사유 
  isAddingDiary : false, //포스트 업로드중

};

/**
 * createAction, handleAction을 이용하여 리듀서 만들기 
 */

//액션 이름
export const ADD_DIARY_REQUEST = 'ADD_DIARY_REQUEST';
export const ADD_DIARY_SUCCESS = "ADD_DIARY_SUCCESS";
export const ADD_DIARY_FAILURE = "ADD_DIARY_FAILURE";

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE'; //비동기가 아니라 동기적으로 없애도 됨. 

export const addDiaryRequestAction = {
    type : ADD_DIARY_REQUEST,
    
};

export const addDiaryRequest = createAction(ADD_DIARY_REQUEST); //User, title, content, img
export const uploadImagesRequest = createAction(UPLOAD_IMAGES_REQUEST); //img url

export default handleActions({
  [addDiaryRequest] : (state,action) => {
    const user = state                                                                                               
  },
  [uploadImagesRequest] : (state,action) => state,
}




const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_DIARY_REQUEST : {
            return {
                ...state,
            }
        }
        
        default : {
            return {
                ...state,
            }
        }
    }
}


export default reducer;