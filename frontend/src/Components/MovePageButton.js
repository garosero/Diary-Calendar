import React, { useState, useEffect, useContext } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import DateContext from "../contexts/date";
import styled from 'styled-components';

const StyleButton = styled.button` 
  margin : 2rem;
`

const MonthBlock = styled.div`
  display :flex;
  flex-direction : row;
`;

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
    <MonthBlock className="Header-item">
      <StyleButton className="changeMonth" onClick={minusMonth}>
        <VscChevronLeft />
      </StyleButton>
      <h1>{currentMonth}</h1>
      <StyleButton className="changeMonth" onClick={plusMonth}>
        <VscChevronRight />
      </StyleButton>
    </MonthBlock>
  );
};

export default MovePageButton;
