import React, { createContext, useState } from 'react';
import moment from 'moment';

const DateContext = createContext({});

const DateProvider = ({children}) => {

    const [currentMonth, setCurrentMonth] = useState(moment().month()+1);

    const value = {
        currentMonth, setCurrentMonth
    }
    

    return (
        <DateContext.Provider value={value}>{children}</DateContext.Provider>
    )
}

//const { Consumer : DateConsumer} = DateContext;
//const ColorConsumer = ColorContext.Consumer와 같은 의미

export { DateProvider };

export default DateContext;