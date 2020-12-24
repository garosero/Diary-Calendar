import axios from 'axios';



//calendar Event (array ) : year, month 
export const calendarAPI = (calendarDate) => {
  console.log("calendar api call");
  return axios.post(`/api/calendar/${calendarDate.calendarId}/${calendarDate.year}/${calendarDate.month}`);
};


//특정 calendar 불러오는 api
export const changeCalendarAPI = (data) => {
  return axios.post(`/api/calendar/${data.calendarId}/${data.year}/${data.month}`);
}

//calendar List call 
export const calendarListAPI = () => {
    console.log('calendarList api call');
    return axios.post('/api/calendar/calendarList/');
};