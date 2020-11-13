export const initialState = {
  diaries: [
    {
      User: {
        id: 1,
        username: "hoho",
      },
      title: "게시글",
      content : "hihi",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScen28QOL6Jj94wAzIew1LBS1BeZzn0Y5wrA&usqp=CAU",
    }, //화면에 보일 포스트들
  ],
  addDiaryErrorReason : false, // 포스트 업로드 실패 사유 
  isAddingDiary : false, //포스트 업로드중

};

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

// const addDummy = {
//     type : ADD_DUMMY,
//     data : {
//         content : 'Hello',
//         userId : 1,
//         User : {
//             username : 'subin',
//         }
//     }

// };

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