import React, {useContext} from 'react'
import moment from 'moment';
import CalendarItem from './CalendarItem';
import DateContext from '../contexts/date'
import './Calendar.scss'

const CalendarGrid = () => {

  const {currentMonth, setCurrentMonth} = useContext(DateContext);

  const myMoment = moment().month(currentMonth-1);

 // const month = moment().month()+1 //jan=1, dec=12
  const startWeek = myMoment.startOf('month').week();
  const endWeek = myMoment.endOf("month").subtract(7,'days').week() +1;
 
  //startOf(month) : set to the first of this month
  //week() - gets or sets week of the year
  //이번년도 월의 첫 시작주가 36번째 주라는 뜻
  //8.30 -> 8월 1일은 이번년도 36번째 주
  const weekLen = endWeek - startWeek + 1;

  const startDay = myMoment.startOf("month").day(); //0-6 : Sun to Sat 이번달의 시작 요일
  const LastDay = myMoment.endOf("month").date();

  let thisMonthDay = Array(startDay + LastDay).fill(0);

  //이번 달의 일자를 채워넣기. 30일이면 30개.
  let result = thisMonthDay.map((val, idx) => {
    val = idx >= startDay ? 1 : 0; //시작하는 요일부터 1 채워넣기
    return val + idx - startDay;
  });


  
  const weekDay = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

  return (
    <>
      <div className="calendar_row">
        {weekDay.map((day,idx)=>{
              return (<div className="columnheader" key={idx}>{day}</div>);
          })}
      </div>
      <div>
        {[...Array(weekLen)].map((val, idx) => {
          return (
            <div key={idx} className="calendar_row">
              {Array(7)
                .fill(-1)
                .map((v, i) => {
                  return <CalendarItem key={i} day={result[idx * 7 + i]} />;
                })}
            </div>
          );
        })}
      </div>
    </>
  );
}
export default CalendarGrid;