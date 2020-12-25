import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Calendar.scss';
import { VscChevronDown } from "react-icons/vsc";
import pantone from '../lib/styles/pantone'
import styled from 'styled-components';
import DateContext from "../contexts/date";
import {CHANGE_CALENDAR_ID_REQUEST} from '../reducers/calendar';


const YearButton = styled.button`
  cursor : pointer;
  position: inline-block;
  background-color: transparent;
  margin-top: 0.3rem;
  color: "black";

  &:focus {
    background-color: #74c0fc;
  }
  &:hover &:active{
    background-color: #a5d8ff;
  }
`;

const SubMenu = styled.div`
  display : ${(props)=> props.open ? 'block' : 'none'};
  z-index : 10;

`;


const CalendarList = () => {
    const dispatch = useDispatch();
    const { currentYear, setCurrentYear } = useContext(DateContext);
    const { calendarList_id } = useSelector(state => state.calendar);
    const [calendarList, setCalendarList] = useState([]);
    const [openSubMenu, setOpenSubMenu] = useState(false);
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

    const onChangeCalendarId = (calendarId) => {
      dispatch({
        type : CHANGE_CALENDAR_ID_REQUEST,
        data : calendarId
      })
    }


    return (
      <div className="sidebar">
        {/* {isLoggedIn ? (
            <div className="calendar_list">
                {diaries.map((c) => {
                    return <div key={c}>{c.title}</div>;
                 })
                }
            </div>
        ) : ( */}
        <div style={{ marginBottom: "1rem" }}>
          {years.map((c, idx) => {
            return (
              <YearButton
                key={idx}
                style={{
                  color: pantone[c],
                  height: "2rem",
                }}
                onClick={(e) => setYearClick(e)}
              >
                {c}
              </YearButton>
            );
          })}
        </div>

        {/* calendarList 목록 */}
        <div
          className="submenu-wrapper"
          onClick={() => {
            setOpenSubMenu((prev) => !prev);
          }}
        >
          <span id="calendarList-name">
            CALENDAR list
            <i>
              <VscChevronDown />
            </i>
          </span>

          <SubMenu open={openSubMenu}>
            {calendarList && calendarList.length > 0
              ? calendarList.map((v, idx) => {
                  return (
                    <YearButton
                      onClick={() => {
                        onChangeCalendarId(v._id);
                      }}
                      key={idx}
                    >
                      {v.summary}
                    </YearButton>
                  );
                })
              : null}
          </SubMenu>
        </div>
      </div>
    );
}

export default CalendarList;