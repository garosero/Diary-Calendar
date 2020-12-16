import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Calendar.scss';
import pantone from '../lib/styles/pantone'
import styled from 'styled-components';
import DateContext from "../contexts/date";


const YearButton = styled.button`
  position: inline-block;
  background-color: transparent;
  margin-bottom : 1rem;
  color : 'black';
`;



const CalendarList = () => {
    const { currentYear, setCurrentYear } = useContext(DateContext);
    const { calendarList_id } = useSelector(state => state.calendar);
    const [calendarList, setCalendarList] = useState([]);
    var years = [2018,2019,2020,2021];

    const setYearClick = (e) => {
        console.log('클릭년도 : '+e.target.textContent);
        setCurrentYear(e.target.textContent);
    }

    useEffect(()=>{
      if(calendarList_id.length >0) setCalendarList(calendarList_id)
      // console.log(calendarList_id);
    },[calendarList_id]);

    


    //const {diaries} = useSelector(state=>state.diary);
    const {user, isLoggedIn} = useSelector(state=>state.user);
    return (
      <div className="calendar_list">
        {/* {isLoggedIn ? (
            <div className="calendar_list">
                {diaries.map((c) => {
                    return <div key={c}>{c.title}</div>;
                 })
                }
            </div>
        ) : ( */}
        <div>
          {years.map((c, idx) => {
            return (
              <YearButton
                key={idx}
                style={{
                  color: pantone[c],
                  margin: "0.5rem",
                  height: "2rem",
                  backgroundColor: "transparent",
                }}
                onClick={(e) => setYearClick(e)}
              >
                {c}
              </YearButton>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",

          }}
        >
          {calendarList && calendarList.length > 0
            ? calendarList.map((v, idx) => {
                return <YearButton key={idx}>{v.summary}</YearButton>;
              })
            : null}
        </div>
      </div>
    );
}

export default CalendarList;