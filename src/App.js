import React from 'react';
import Calendar from './Components/Calendar'
// import Header from './Components/Header';
import MovePageButton from './Components/MovePageButton';
import { DateProvider } from "./contexts/date";

const App = () => {
    return (
        <DateProvider>
            <MovePageButton />
            <Calendar />
        </DateProvider>
    );
};

export default App;