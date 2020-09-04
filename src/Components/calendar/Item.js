import React, { useState } from 'react'
import styled from 'styled-components';

const ItemDiv = styled.div`
  border-right: #dadce0 1px solid;
  flex: 1 1 0%;
  text-align: center;
  font-family: Roboto, Arial, sans-serif;
  text-transform: uppercase;
  &:hover {
    background-color: #e6e6fa;
  }
`;

const Item=(props)=> {
    //const [data, setData] = useState();
    const data = "";

    return (
        <>
            <ItemDiv>
                {props.day > 0 ? props.day : ''}
                <br />
                {data}
            </ItemDiv>
        </>
        //<>가 아닌 <div>태그에 감싸져있었을 땐 delegation이 안됨
        //Row의 font-size가 적용이 안됐었음
    )
}

export default Item
