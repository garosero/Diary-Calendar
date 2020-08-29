import React from 'react'
import './Calendar.scss'
import moment from 'moment';

const CalendarBody=()=> {

        const today = moment().format('MM DD YYYY');
        const month = today.substring(0,2);
        const startWeek = moment().startOf('month').week();
        //startOf(month) - set to the first of this month 
        //week() - gets or sets the week of the year 
        //이번년도 월의 첫 시작주가 36번째 주라는 뜻 
        //8.30 -> 8월 1일은 이번년도 36번째 주 
        const endWeek = moment().endOf('month').week(); 
        
        //endWeek - startWeek = 이번 달 몇 주인지
        //시작 요일 
        
        const startDay = moment().startOf('month').day();
        const LastDay = String(moment().endOf('month')).substring(8,10);
        console.log(LastDay); // 31
        //0-6 : Sun to Sat 이번달의 시작 요일
        let thisMonthDay = Array(Number(LastDay)+Number(startDay)).fill(0); 
        let result;
        result = thisMonthDay.map((val,idx)=>{
            val = idx >= Number(startDay) ? 1 : 0;
            return val+idx-6;
        })
        const weekLen = Number(endWeek)-Number(startWeek);

        console.log(weekLen+1);

    

    return (
        <>
            {[...Array(weekLen+1)].map((val,idx)=>{
                return (
                  <div key={idx} className="row">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                  </div>
                );
            })

            }
          
        </>
    )
}

export default CalendarBody
