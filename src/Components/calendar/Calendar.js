import React from 'react';
import styled from 'styled-components';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';

const Grid = styled.div`
    display : flex;
    flex-direction : column;
    height : 100%;
`;

const GridContainer = styled.div`
    position : absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
`;


const Calendar = () => {
    

    return (
      <>
        <GridContainer>
          <Grid>
            <CalendarHead />
            <CalendarBody />
          </Grid>
        </GridContainer>
      </>
    );
}

export default Calendar;