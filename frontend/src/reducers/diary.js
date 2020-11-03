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
    },
  ],
};

//액션 이름
export const ADD_DIARY = 'ADD_DIARY';
export const ADD_DUMMY = 'ADD_DUMMY';

export const addDiary = {
    type : ADD_DIARY,
    
};

const addDummy = {
    type : ADD_DUMMY,
    data : {
        content : 'Hello',
        userId : 1,
        User : {
            username : 'subin',
        }
    }

};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_DIARY : {
            return {
                ...state,
            }
        }
        case ADD_DUMMY : {
            return {
                ...state,
                mainPosts : [action.data, ...state.mainPosts],
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