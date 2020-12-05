
export const initialState = {
    loadMyInfoLoading : false, //유저 정보 가져오기 시도중
    loadMyInfoDone : false, 
    loadMyInfoError : null,
    isLoggedIn : false, //로그인 여부
    isLoggingOut : false, //로그아웃 시도중
    isLoggingIn : false, //로그인 시도중
    logInErrorReason : false, //로그인 실패 사유
    isSignedUp : false, //회원가입 성공
    isSigningUp : false, //회원가입 시도중
    signUpErrorReason : '', //회원가입 실패 사유
    me : {
        userId : "",
        password : "",
    }, //내 정보
    diaries : null, //일기장 정보 
    userData : null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; //액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";  //리덕스 사가가 필요한 것들
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const TEMP_SET_USER = "TEMP_SET_USER";


//실제 액션 이 함수를 반환 
export const loginRequestAction = (data) => ({
    type : LOG_IN_REQUEST,
    data : {
        userId : data.id,
        password : data.password
    } //data는 되고 userData는 안됨... 인자로 어떻게 돌아가는지 
});
//action creator는 액션을 만든다.
//액션은 payload of information 오브젝트로써 스토어에 보내진다. 

export const loginSuccessAction = {
    type : LOG_IN_SUCCESS,
}

export const loginFailureAction = {
    type : LOG_IN_FAILURE,
}


export const logoutRequestAction = {
  type: LOG_OUT_REQUEST,
};

//export const tempSetUser = createAction(TEMP_SET_USER, user=>user);
export const tempSetUser = (user) => ({
    type : TEMP_SET_USER,
    user : user, 
})


export const signUpRequestAction = (data) => ({
    
        type : SIGN_UP_REQUEST,
        data : {
            userId : data.userId,
            password : data.password,
        }
    
});
//동적 데이터는 함수로 만들어서 해야됨.

export const loadMyInfo = {
    type : LOAD_MY_INFO_REQUEST,
}

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
        case TEMP_SET_USER : {
            return {
                ...state,
                me : action.user,
                isLoggedIn : true,
            }
        }

        case LOG_IN_REQUEST : {
            return {
                ...state,
                isLoggingIn : true,
                me :action.data.userId,
            }
        }

        case LOG_IN_SUCCESS : {
            return {
              ...state,
              isLoggingIn : false, 
              isLoggedIn : true,
            };
        }

        case LOG_IN_FAILURE : {
            return {
                ...state,
                isLoggingIn : false,
                isLoggedIn : false,
                logInErrorReason : action.error,
                me : null,
            }
        }

        case LOG_OUT_REQUEST : {
            return {
                ...state,
                isLoggedIn : false,
                isLoading : true,
            }
        }

        case LOG_OUT_SUCCESS : {
            return {
                ...state,
                isLoggedIn : false,
                isLoading : false,
                me : null,
            }
        }

        case LOG_OUT_FAILURE : {
            return {
                ...state,
                isLoading : false,
            }
        }

        case SIGN_UP_REQUEST : {
            return {
                ...state,
                isSigningUp : true,
                user : action.data,
            }
        }

        case SIGN_UP_SUCCESS : {
            return {
                ...state,
                isSigningUp : false,
                isSignedUp : true,
                user : action.data,

            }
        }

        case SIGN_UP_FAILURE : {
            return {
                ...state,
                isSigningUp : false,
                user : action.data,
                signUpErrorReason : action.error,
            }
        }

        case LOAD_MY_INFO_REQUEST : {
            return {
                ...state,
                loadMyInfoLoading : true,
                loadMyInfoDone : false,
                loadMyInfoError : null,
            }
        }

        case LOAD_MY_INFO_SUCCESS : {
            return {
                ...state,
                loadMyInfoLoading : false,
                loadMyInfoDone : true,
            }
        }

        case LOAD_MY_INFO_FAILURE : {
            return {
                ...state,
                loadMyInfoLoading : false,
                loadMyInfoDone : true,
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