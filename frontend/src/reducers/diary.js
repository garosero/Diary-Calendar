import { produce } from 'immer';
import { handleActions, createAction } from "redux-actions";

export const initialState = {
  // diaries:
  //   {
  //     content : ''
  //   }, //화면에 보일 포스트들
  diaries: [
    {
      content: "",
      calendarDate: "",
      img: [],
    },
  ],
   imagePath : [],
    addDiaryErrorReason: false, // 포스트 업로드 실패 사유
      isAddingDiary: false, //포스트 업로드중
      diaryAdded: false,
      error: "",
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

export const LOAD_DIARY_REQUSET = 'LOAD_DIARY_REQUEST';
export const LOAD_DIARY_SUCCESS = 'LOAD_DIARY_SUCCESS';
export const LOAD_DIARY_FAILURE = 'LOAD_DIARY_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE'; //비동기가 아니라 동기적으로 없애도 됨. 

// export const addDiaryRequestAction = {
//     type : ADD_DIARY_REQUEST,
    
// };

export const addDiaryRequest = createAction(ADD_DIARY_REQUEST); //User, title, text, img
export const uploadImagesRequest = createAction(UPLOAD_IMAGES_REQUEST); //img url

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DIARY_REQUEST":
    // return produce(state, (draft) => {
    //   draft.isAddingDiary = true;
    //   draft.diaries[title] = action.title;
    //   draft.content= action.data;
    //});

    case "ADD_DIARY_SUCCESS ":
      // return {
      //   ...state,
      //   content: action.data.get("content"),
      //   isAddingDiary: false,
      // };
      // return produce(state,(draft) => {
      //   // draft.diaries[content] = action.content;
      //   // raft.diariesd
      // })

      return produce(state, (draft) => {
        draft.diaries.push(action.data);
      });

    case "ADD_DIARY_FAILURE":
      return {
        ...state,
      };

    case "UPLOAD_IMAGES_REQUEST":
      // return {
      //   ...state,

      // }
      return {
        ...state,
      };

    /**
     *  action.data : imageFormData(Array)
     *  FIX : concat 말고 다른 방법 생각해보기 
     */
    case "UPLOAD_IMAGES_SUCCESS":
      return {
        ...state,
        imagePath: [...state.imagePath].concat(action.data),
      };

    case "UPLOAD_IMAGES_FAILURE":
      return {
        ...state,
      };

    case "LOAD_DIARY_REQUEST": {
      return {
        ...state,
      };
    }
    case "LOAD_DIARY_SUCCESS": {
      // return {
      //   ...state,
      //   imagePath : action.data.img,
      //   content : action.data.content,
      // };
      return produce(state, (draft) => {
        draft.diaries.push(action.data);
      });
    }
    case "LOAD_DIARY_FAILURE": {
      return {
        ...state,
        error: action.error,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};




// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case ADD_DIARY_REQUEST : {
//             return {
//                 ...state,
//             }
//         }
        
//         default : {
//             return {
//                 ...state,
//             }
//         }
//     }
// }


export default reducer;