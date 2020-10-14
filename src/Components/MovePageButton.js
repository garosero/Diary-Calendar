import React, { useState, useEffect, useContext } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import DateContext from "../contexts/date";


const MovePageButton = () => {
  const { currentMonth, setCurrentMonth } = useContext(DateContext);

  const minusMonth = () => {
    if (currentMonth > 1) {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const plusMonth = () => {
    if (currentMonth < 12) {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <>
      <h1>{currentMonth}</h1>
      <button className="changeMonth" onClick={minusMonth}>
        <VscChevronLeft />
      </button>
      <button className="changeMonth" onClick={plusMonth}>
        <VscChevronRight />
      </button>
    </>
  );
};

export default MovePageButton;
