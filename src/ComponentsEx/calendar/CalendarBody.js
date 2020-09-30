import React from 'react'
import './Calendar.scss'
import moment from 'moment';
import Item from './Item';

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
        console.log("start : "+startDay);
        console.log(LastDay); // 31
        //0-6 : Sun to Sat 이번달의 시작 요일
        let thisMonthDay = Array(Number(LastDay)+Number(startDay)).fill(0);
        //이번달 array  
        let result;
        result = thisMonthDay.map((val,idx)=>{
            val = idx >= Number(startDay) ? 1 : 0;
            // 0 
            return val+idx-Number(startDay);
        })
        const weekLen = Number(endWeek)-Number(startWeek);
        console.log(result);
        console.log(weekLen+1);

    

    return (
        <>
            {[...Array(weekLen+1)].map((val,idx)=>{
                return (
                  <div key={idx} className="row">
                    {Array(7).fill(-1).map((v,i)=>{
                        return(
                            <Item key={i} day={result[idx*7 + i]} />
                        )
                    })}
                  </div>
                );
            })

            }
          
        </>
    )
}

export default CalendarBody
