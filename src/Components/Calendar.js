
import React from 'react';
import './Calendar.scss';
import CalendarTemplate from './CalendarTemplate';
import CalendarGrid from './CalendarGrid'

const Calendar = () => {

    return (
        <div>
            <CalendarTemplate>
                <CalendarGrid />
            </CalendarTemplate>
        </div>

    );
}

export default Calendar;