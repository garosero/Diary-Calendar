import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Calendar.scss';
import { VscChevronDown } from "react-icons/vsc";
import pantone from '../lib/styles/pantone'
import styled from 'styled-components';
import DateContext from "../contexts/date";
import {CHANGE_CALENDAR_ID_REQUEST} from '../reducers/calendar';


//그냥 button으로 해서 true, false값으로 색 checked 정하면 되는거였네... 
const CheckBox = styled.div`
  margin: 4px;
  background-color: #efefef;
  border-radius: 4px;
  border: 1px solid #d0d0d0;
  overflow: auto;
  float: left;

  label {
    float: left;
    width: 4em;
  }

  label span {
    text-align: center;
    display: block;
  }

  label input {
    position: absolute;
    top: -20px;
  }

  input:checked + span {
    box-shadow: -1px -1px grey;
    background-color: #dee2e6;
    color : #efefef;
  }
`;

const YearButton = styled.button`
  cursor: pointer;
  position: inline-block;
  background-color: "#f1f3f5";
  background-color: ${(props) => (props.selected ? "#364fc7" : "#f1f3f5")};
  margin-top: 0.3rem;
  color : ${(props)=>(props.selected) ? "white" : "black"};

  /* &:focus {
    background-color: #74c0fc;
  } */

  &:hover {
    background-color: #a5d8ff;
  }

  &:checked {
    box-shadow: -1px -1px grey;
    background-color: #dee2e6;
  }
`;

const SubMenu = styled.div`
  display : ${(props)=> props.open ? 'block' : 'none'};
  z-index : 10;
  overflow : auto;


`;


const CalendarList = () => {
    const dispatch = useDispatch();
    const { currentYear, setCurrentYear } = useContext(DateContext);
    const { calendarList_id } = useSelector(state => state.calendar);
    const [calendarList, setCalendarList] = useState([]);
    const [openSubMenu, setOpenSubMenu] = useState(false); //calendarList 열기
    const [buttonSelected, setButtonSelected] = useState([]);
    const [years, setYears] = useState([2018,2019,2020,2021]);

    const setYearClick = (e,id) => {
        //id와 일치하는 idx의 button(array)만 true, 나머진 false로 만들기
        setCurrentYear(years[id]);
        let newSelected = Array(years.length).fill(false).map((val, idx) => {
          return idx === id ? true : false;
        });
        setButtonSelected(newSelected);
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
    };



    //누른 YearButton만 background 색 변경.
    return (
      <div className="sidebar">
        <div style={{ marginBottom: "1rem" }}>
          {years.map((year,idx)=>{
            return(
              <YearButton
                key={idx}
                selected={buttonSelected[idx]}
                onClick={(e)=>{
                  setYearClick(e,idx)
                }}
              >
                <span>{year}</span>
              </YearButton>
            )
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
                      type="radio"
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