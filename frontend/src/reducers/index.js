import { combineReducers } from 'redux';
import user from './user';
import diary from './diary';
import calendar from './calendar';


//reducer들을 가져와 rootReducer로 묶기 (중앙통제)
const rootReducer = combineReducers({
    user,
    diary,
    calendar,
})

export default rootReducer;


