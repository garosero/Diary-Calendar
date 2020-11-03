import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../reducers/user';
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
/** 로그인 폼 **/

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/** 스타일링된 input **/

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  outline: none;
  width: 70%;
  margin: 0 auto;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const LoginForm = () => {
    const [id, onChangeId] = useState('');
    const [password, onChangePassword] = useState('');
    const dispatch = useDispatch();

    const onChange = (e) => {
        console.log(e);
    }

    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        dispatch(loginAction);
    },[id,password]);

    

  return (
    <AuthFormBlock>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChangeId}
          value={id}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChangePassword}
          value={password}
        />
        <button>로그인 </button>
      </form>
      {/* <Footer>
          <Link to="login">로그인</Link>
    
      </Footer> */}
    </AuthFormBlock>
  );
};

//autoComplete : 자동완성

export default LoginForm;
