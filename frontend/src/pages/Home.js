import React, {useEffect} from 'react'
import Header from "../Components/Header";
import CalendarContent from "../Components/CalendarContent";
import { DateProvider } from "../contexts/date";


const Home = () => {

    return (
      <div className="calendar_wrap">
        <DateProvider>
          <Header />
          <CalendarContent />
        </DateProvider>
      </div>
    );
}

export default Home;
