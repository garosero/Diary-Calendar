import React from "react";
import styled from "styled-components";
import Calendar from "./calendar/Calendar";

const Head = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 8vh;
  background-color: #5d4954;
`;

const Header = () => {
    
    return (
      <Head>
        <div>
          <h4>Calendar</h4>
        </div>
      </Head>
    );
};

export default Header;