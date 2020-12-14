
export const initialState = {
    calendarList_id : [],
    currentCalendarList_id : '',
    calendarEvent : [],
}

export const LOAD_CALENDAR_LIST_REQUEST = 'LOAD_CALENDAR_LIST_REQUEST';
export const LOAD_CALENDAR_LIST_SUCCESS = "LOAD_CALENDAR_LIST_SUCCESS";
export const LOAD_CALENDAR_LIST_FAILURE = "LOAD_CALENDAR_LIST_FAILURE";

export const LOAD_CALENDAR_EVENTS_REQUEST = 'LOAD_CALENDAR_EVENTS_REQUEST';
export const LOAD_CALENDAR_EVENTS_SUCCESS = "LOAD_CALENDAR_EVENTS_SUCCESS";
export const LOAD_CALENDAR_EVENTS_FAILURE = "LOAD_CALENDAR_EVENTS_FAILURE";

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOAD_CALENDAR_LIST_REQUEST":
        return {
          ...state,
          
        };

      case "LOAD_CALENDAR_LIST_SUCCESS":
        return {
          ...state,
          calendarList_id: action.data.map((v, i) => {
            return v._id;
          }),
        };
      case "LOAD_CALENDAR_LIST_FAILURE":
        return {
          ...state,
        };

      case "LOAD_CALENDAR_EVENTS_REQUEST":
        return {
          ...state,
        };
        
      case "LOAD_CALENDAR_EVENTS_SUCCESS":
        return {
          ...state,

        };
    }
}