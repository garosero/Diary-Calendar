import React, {useEffect} from 'react'
import Header from "../Components/Header";
import CalendarContent from "../Components/CalendarContent";
import { DateProvider } from "../contexts/date";
import { useSelector, useDispatch } from 'react-redux';


const Home = () => {

  const dispatch = useDispatch();

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
