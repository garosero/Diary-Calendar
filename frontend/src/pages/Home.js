import React, {useEffect} from 'react'
import Header from "../Components/Header";
import CalendarContent from "../Components/CalendarContent";
import { DateProvider } from "../contexts/date";
import { useSelector, useDispatch } from 'react-redux';
import { AiFillGithub } from "react-icons/ai";
import {LOAD_CALENDAR_LIST_REQUEST} from '../reducers/calendar'


const Home = () => {


  const dispatch = useDispatch();


  useEffect(() => {    
    dispatch({
      type: LOAD_CALENDAR_LIST_REQUEST,
    });
  },[]);



    return (
      <>
        <div className="calendar_wrap">
          <DateProvider>
            <Header />
            <CalendarContent />
          </DateProvider>
        </div>
        <footer style={{marginTop : '1.5rem'}}>
          <AiFillGithub />
          <a href="https://github.com/garosero/Diary-Calendar">Github</a>
        </footer>
      </>
    );
}

export default Home;
