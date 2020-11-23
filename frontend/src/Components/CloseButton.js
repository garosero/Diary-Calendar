import React from 'react'
import styled from "styled-components";

const StyledButton = styled.button`
  top : 5px;
  left : 95%;
  outline: none;
  height: 25px;
  width: 15px;
  text-align: justify;
  border-radius: 10px;
  background: #fff;
  border: ${(props) => props.themeColor || "#808080"} 2px solid;
  /* 테두리 */
  color: ${(props) => props.themeColor || "#808080"};
  letter-spacing: 1px;
  text-shadow: 0;
  font : {
    size: 20px;
    weight: bold;
  }
  line-height: 1;
  
  /* line-height는 height의 px과 맞추면 버튼 안의 텍스트 height의 가운데로 정렬 */
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    color: ${(props) => props.themeHoverColor || "#fa2941"};
    border: ${(props) => props.themeHoverColor || "#fa2941"} 2px solid;
  }
  &:active {
    letter-spacing: 2px;
  }
  &:after {
    
  }

`;

const CloseButton = ({value}) => {

  

    return (

        <StyledButton>
              {value}
        </StyledButton>
    )
}

export default CloseButton
