import React, { createContext, useState } from 'react';
import moment from 'moment';

const DateContext = createContext({});

const DateProvider = ({children}) => {

    const [currentMonth, setCurrentMonth] = useState(moment().month()+1); //현재 월(0 to 11이므로 +1해야 12월이면 12월로 보임)
    const [currentYear, setCurrentYear] = useState(moment().year()); //현재 년 

    const value = {
        currentMonth, setCurrentMonth,
        currentYear, setCurrentYear,
    }
    

    return (
        <DateContext.Provider value={value}>{children}</DateContext.Provider>
    )
}

//const { Consumer : DateConsumer} = DateContext;
//const ColorConsumer = ColorContext.Consumer와 같은 의미

export { DateProvider };

export default DateContext;