
export const initialState = {
    calendarList_id : [],
    currentCalendarList_id : 'primary',
    calendarEvent : [],
    isAddingEvent : false,

}

export const LOAD_CALENDAR_LIST_REQUEST = 'LOAD_CALENDAR_LIST_REQUEST';
export const LOAD_CALENDAR_LIST_SUCCESS = "LOAD_CALENDAR_LIST_SUCCESS";
export const LOAD_CALENDAR_LIST_FAILURE = "LOAD_CALENDAR_LIST_FAILURE";

export const LOAD_CALENDAR_EVENTS_REQUEST = 'LOAD_CALENDAR_EVENTS_REQUEST';
export const LOAD_CALENDAR_EVENTS_SUCCESS = "LOAD_CALENDAR_EVENTS_SUCCESS";
export const LOAD_CALENDAR_EVENTS_FAILURE = "LOAD_CALENDAR_EVENTS_FAILURE";

export const CHANGE_CALENDAR_ID_REQUEST = "CHANGE_CALENDAR_ID_REQUEST";
export const CHANGE_CALENDAR_ID_SUCCESS = "CHANGE_CALENDAR_ID_SUCCESS";
export const CHANGE_CALENDAR_ID_FAILURE = "CHANGE_CALENDAR_ID_FAILURE";




const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOAD_CALENDAR_LIST_REQUEST":
        return {
          ...state,
  
        };

      case "LOAD_CALENDAR_LIST_SUCCESS":
        return {
          ...state,
          calendarList_id: action.data,
        
        };
      case "LOAD_CALENDAR_LIST_FAILURE":
        return {
          ...state,
    
        };

      case "LOAD_CALENDAR_EVENTS_REQUEST":
        return {
          ...state,
          isAddingEvent : true,
        };

      case "LOAD_CALENDAR_EVENTS_SUCCESS":
        return {
          ...state,
          calendarEvent: action.data,
          isAddingEvent: false,
        };

      case 'LOAD_CALENDAR_EVENTS_FAILURE' :
        return {
          ...state,
          isAddingEvent : false,
        }

      case "CHANGE_CALENDAR_ID_REQUEST":
        return {
          ...state,
          currentCalendarList_id: action.data,
          isAddingEvent: true,
        };

      case "CHANGE_CALENDAR_ID_SUCCESS":
        return {
          ...state,
          isAddingEvent : false,
         
        };
      case "CHANGE_CALENDAR_ID_FAILURE":
        return {
          ...state,
          isAddingEvent :false,
        };

      default: {
        return {
          ...state,
        };
      }
    }
}

export default reducer;