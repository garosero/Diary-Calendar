import React, {useEffect, useState} from "react";
import styled from "styled-components";
import CloseButton from './CloseButton';
import { useSelector } from 'react-redux';
import Modal from './Modal';



const ItemDiv = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 3px;
  background-color: #d0bfff;
  font-size: 14px;
  line-height: 30px;
  width: 100%;
  /* border-right: #dadce0 1px solid; */
  flex: 1 1 0%;
  text-align: center;
  font-family: Roboto, Arial, sans-serif;
  text-transform: uppercase;

  &:hover {
    background-color: rgb(3, 155, 229);
    cursor: pointer;
  }
`;

const CalendarItem = (props) => {

  const { calendarEvent } = useSelector(state=>state.calendar);
  const [dayEvent, setDayEvent] = useState([]);
  //calendarEvent  : array 
  // _id, day, title, memo, startTime, endTime, location, people
 
  const day = props.day > 0 ? props.day : "";
  const currentFullDay = `${props.year}-${props.month}-${props.day}`
  useEffect(()=>{
    if(calendarEvent.length>0){
      var result = calendarEvent.filter(v=>v.startTime === currentFullDay);
       setDayEvent(result);
    }else setDayEvent(null);
  },[calendarEvent]);

  return (
    <>
      <div className="item">
        {day}
        <br />
        <div >
          {dayEvent && dayEvent.length > 0
            ? dayEvent.map((item, idx) => {
                return <ItemDiv key={idx}>{item.title}</ItemDiv>;
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default CalendarItem;
