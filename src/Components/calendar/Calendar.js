import React from 'react';
import styled from 'styled-components';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';

const Grid = styled.div`
    display : flex;
    flex-direction : column;
    height : 100%;
`;


const Calendar = () => {
    

    return (
        <>
            <Grid>
                <CalendarHead />
                <CalendarBody />
            </Grid>
        </>
    )
}

export default Calendar;