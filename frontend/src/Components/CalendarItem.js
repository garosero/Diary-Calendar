import React, {useEffect, useState} from "react";
import styled from "styled-components";
import moment from "moment";
import CloseButton from './CloseButton';
import { useSelector } from 'react-redux';
import Modal from './Modal';
import './Calendar.scss';



const ItemDiv = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 3px;
  background-color: ${(props)=>props.color || '#1c7ed6'};
  color: #fff;
  font-size: 14px;
  font-family: "Nanum Gothic", sans-serif;
  line-height: 30px;
  width: 100%;
  /* border-right: #dadce0 1px solid; */
  flex: 1 1 0%;
  text-align: center;
  text-transform: uppercase;

  &:hover {
    background-color: rgb(3, 155, 229);
    cursor: pointer;
  }
`;

const CalendarItem = (props) => {

  const { calendarEvent } = useSelector(state=>state.calendar);
  const { uploadDiaryDate } = useSelector(state=>state.diary);
  const diaries = useSelector(state=>state.diary.diaries);
  const [dayEvent,setDayEvent] = useState([]);
  
  const backgroundColor = ['#1c7ed6',"#3F51B5", "#E67C73", '#F6BF26'];
  //calendarEvent  : array 
  // _id, day, title, memo, startTime, endTime, location, people


 
  const day = props.day > 0 ? props.day : "";
  const currentFullDay = moment(
    `${props.year}-${props.month}-${props.day}`
  ).format("YYYY-MM-DD");

  useEffect(()=>{
    if(calendarEvent.length>0){ 
      var result = calendarEvent.filter(v=>{
        return v.startTime === currentFullDay;
      });
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
                return <ItemDiv key={item._id} colo={backgroundColor[idx]}>{item.title}</ItemDiv>;
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default CalendarItem;
