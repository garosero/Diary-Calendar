import React, {useState} from "react";
import styled from "styled-components";
import CloseButton from './CloseButton';



// const ItemDiv = styled.div`
//   font-size: 14px;
//   line-height: 30px;
//   border-right: #dadce0 1px solid;
//   flex: 1 1 0%;
//   text-align: center;
//   font-family: Roboto, Arial, sans-serif;
//   text-transform: uppercase;
//   &:hover {
//     background-color: #e6e6fa;
//   }
// `;

const CalendarItem = (props) => {

  // const toggle = (e) => {
  //   e.preventDefault();
  //   setIsShowing(!isShowing)
 
 
  const day = props.day > 0 ? props.day : "";

  return (
    <> 
    <div className="item">
 
      {day}
     
    </div>
    </>
  );
};

export default CalendarItem;
