export const initialState = {
    isLoggedIn : false,
    user : {},
};

export const LOG_IN = 'LOG_IN'; //액션의 이름
export const LOG_OUT = 'LOG_OUT';

//실제 액션 
export const loginAction = {
    type : LOG_IN,
}

export const logoutAction = {
    type : LOG_OUT,
};

const dummyUser = {
    username : 'subin',
    birth : '19961023',
    diaries : [],
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case LOG_IN : {
            return {
                ...state,
                isLoggedIn : true,
                user : dummyUser,
            }
        }
        case LOG_OUT : {
            return {
                ...state,
                isLoggedIn : false,
                user : null
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