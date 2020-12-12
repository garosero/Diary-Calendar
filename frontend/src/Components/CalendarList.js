import React, { useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Calendar.scss';
import pantone from '../lib/styles/pantone'
import styled from 'styled-components';
import DateContext from "../contexts/date";


const YearButton = styled.button`
    position : inline-block;

`;



const CalendarList = () => {
    const { currentYear, setCurrentYear } = useContext(DateContext);
    var years = [2018,2019,2020,2021];

    const setYearClick = (e) => {
        console.log('클릭년도 : '+e.target.textContent);
        setCurrentYear(e.target.textContent);
    }


    //const {diaries} = useSelector(state=>state.diary);
    const {user, isLoggedIn} = useSelector(state=>state.user);
    return (
      <>
        {/* {isLoggedIn ? (
            <div className="calendar_list">
                {diaries.map((c) => {
                    return <div key={c}>{c.title}</div>;
                 })
                }
            </div>
        ) : ( */}
          <div className="calendar_list">
              {years.map((c,idx)=>{
                  return <YearButton key={idx} style={{color : pantone[c], margin : '0.5rem', height : '2rem', backgroundColor : 'transparent'}} onClick={(e)=>setYearClick(e)}>{c}</YearButton>
              })}
          </div>
        
      </>
    );
}

export default CalendarList;