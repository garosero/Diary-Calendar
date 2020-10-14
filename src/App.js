import React from 'react';
// import Header from './Components/Header';
import Header from './Components/Header';
import CalendarContent from './Components/CalendarContent'
import { DateProvider } from "./contexts/date";

const App = () => {
    return (
      <div className="calendar_wrap">
        <DateProvider>
          <Header />
          <CalendarContent />
        </DateProvider>
      </div>
    );
};

export default App;