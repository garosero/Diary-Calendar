export const initialState = {
    isLoggedIn : false, //로그인 여부
    isLoggingOut : false, //로그아웃 시도중
    isLoggingIn : false, //로그인 시도중
    logInErrorReason : false, //로그인 실패 사유
    signedUp : false, //회원가입 성공
    isSigningUp : false, //회원가입 시도중
    signUpErrorReason : '', //회원가입 실패 사유
    user : null, //내 정보
    diaries : null, //일기장 정보 
    data : null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN'; //액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";  //리덕스 사가가 필요한 것들
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";



//실제 액션 
export const loginRequestAction = (data) => ({
    type : LOG_IN_REQUEST,
    data : {
        userId : data.id,
        password : data.password
    }
});

export const loginSuccessAction = {
    type : LOG_IN_SUCCESS,
}

export const loginFailureAction = {
    type : LOG_IN_FAILURE,
}


export const logoutRequestAction = {
  type: LOG_OUT_REQUEST,
};


export const signUpRequestAction = ({userId, password}) => {
    return {
        type : SIGN_UP_REQUEST,
        userId,
        password
    }
}
//동적 데이터는 함수로 만들어서 해야됨.

const dummyUser = {
    username : 'subin',
    birth : '19961023',
    diaries : [],
    signUpData : {
        id : '',
        password : '',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case LOG_IN_REQUEST : {
            return {
                ...state,
                isLoggingIn : true,
                data : action.data,
            }
        }

        case LOG_IN_SUCCESS : {
            return {
              ...state,
              isLoggingIn : false, 
              isLoggedIn : true,
              user : action.user,
            };
        }

        case LOG_IN_FAILURE : {
            return {
                ...state,
                isLoggingIn : false,
                isLoggedIn : false,
                logInErrorReason : action.error,
                user : null,
            }
        }

        case LOG_OUT_REQUEST : {
            return {
                ...state,
                isLoggedIn : false,
                user : null,
                isLoading : true,
            }
        }

        case SIGN_UP_REQUEST : {
            return {
                ...state,
                signUpData : action.data,
            }
        }

        default : {
            return {
                ...state,
            }
        };
    }
};

//통째로 setState = > action / reducer로 분리된 것 

export default reducer;