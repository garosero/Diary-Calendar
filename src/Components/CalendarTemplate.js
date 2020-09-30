import React from 'react';
import './Calendar.scss';
import './CalendarGrid';


const CalendarTemplate = ({ children }) => {
    return(
        <div className='calendar_template'>
            {/* <div className='app-title'>Calendar</div> */}
            <div className='content'>{children}</div>
        </div>
    );
};

export default CalendarTemplate;