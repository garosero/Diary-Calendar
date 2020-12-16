import React, {useEffect} from 'react'
import Header from "../Components/Header";
import CalendarContent from "../Components/CalendarContent";
import { DateProvider } from "../contexts/date";
import { useSelector, useDispatch } from 'react-redux';
import {LOAD_CALENDAR_EVENTS_REQUEST, LOAD_CALENDAR_LIST_REQUEST} from '../reducers/calendar'


const Home = () => {


  const dispatch = useDispatch();


  useEffect(() => {    
    dispatch({
      type: LOAD_CALENDAR_LIST_REQUEST,

    });
  },[]);



    return (
      <div className="calendar_wrap">
        <DateProvider>
          <Header />
          <CalendarContent />
        </DateProvider>
      </div>
    );
}

export default Home;
