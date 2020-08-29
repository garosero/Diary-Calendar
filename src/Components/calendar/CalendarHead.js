import React from 'react'
import styled from "styled-components";
import './calendar.scss';

// const Grid = styled.div`
//     position : absolute;
//     display : grid;
//     grid-template-columns : repeat(7,1fr);
//     margin:20px;
//     grid-template-row : repeat(5,1fr);
//     grid-gap : 10px;
//     font-size : 15px;
//     background-color : pink;
//     border : 1px solid black;
    
// `;

const Row = styled.div`
    display : flex;
    height : 20px;
    font-size : 14px;
`;

const CalendarHead = () => {

    const weekDay = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    

    return (
        <>
            <Row>
                {weekDay.map((day,idx)=>{
                    return (<div className="columnheader" key={idx}>{day}</div>);
                })}
               
            </Row>
        </>
    )
    
}

export default CalendarHead
