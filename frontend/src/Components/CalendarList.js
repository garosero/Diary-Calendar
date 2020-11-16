import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Calendar.scss'



const CalendarList = () => {
    //const {diaries} = useSelector(state=>state.diary);
    const {user, isLoggedIn} = useSelector(state=>state.user);
    return (
      <>
        {/* {isLoggedIn ? (
            <div className="calendar_list">
                {diaries.map((c) => {
                    return <div key={c}>{c.title}</div>;
                 })
                }
            </div>
        ) : ( */}
          <div className="calendar_list">
              <div>1</div>
              <div>2</div>
          </div>
        
      </>
    );
}

export default CalendarList;