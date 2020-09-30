import React, {useState, useEffect, useContext }from 'react'
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import DateContext from '../contexts/date';
import Header from './Header';


const MovePageButton = () => {

  const {currentMonth, setCurrentMonth } = useContext(DateContext);


  const minusMonth = () => {
      if(currentMonth > 1){
        setCurrentMonth(currentMonth -1)
      }
  }

  const plusMonth = () => {
      if(currentMonth < 12){
         setCurrentMonth(currentMonth+1)
      }
  }

  return (
    <Header>
      <h1>{currentMonth}</h1>
      <button onClick={minusMonth}>
        <VscChevronLeft />
      </button>
      <button onClick={plusMonth}>
        <VscChevronRight />
      </button>
    </Header>
  );
}

export default MovePageButton;
