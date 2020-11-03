import { combineReducers } from 'redux';
import user from './user';
import diary from './diary';


//reducer들을 가져와 rootReducer로 묶기 (중앙통제)
const rootReducer = combineReducers({
    user,
    diary,
})

export default rootReducer;


