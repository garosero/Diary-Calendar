import React, { useState, useEffect, useContext } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import DateContext from "../contexts/date";
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { LOAD_CALENDAR_EVENTS_REQUEST } from "../reducers/calendar";

const StyleButton = styled.button` 
  margin : 2rem;
`

const MonthBlock = styled.div`
  display :flex;
  flex-direction : row;
`;

const MovePageButton = () => {
  const dispatch = useDispatch();
  const {currentCalendarList_id} = useSelector(state => state.calendar);
  const { currentYear,currentMonth, setCurrentMonth } = useContext(DateContext);

  useEffect(() => {

    dispatch({
      type: LOAD_CALENDAR_EVENTS_REQUEST,
      data: {
        calendarId : currentCalendarList_id,
        year: currentYear,
        month: currentMonth-1,
      },
    });
  }, [currentMonth,currentYear,currentCalendarList_id]);

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
