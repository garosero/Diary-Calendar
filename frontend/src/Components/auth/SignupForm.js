import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import {useDispatch, useSelector} from 'react-redux';
import {signUpRequestAction} from '../../reducers/user';

import useInput from '../../hooks/useInput';

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

//useCallback -> 처음 렌더링될 때만 컴포넌트 생성되도록 
const SignupForm = () => {
    const [userId, onChangeUserId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [confirmPassword, onChangeConfirmPassword] = useInput('');
    const dispatch = useDispatch();



    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert("비밀번호가 다릅니다.")
        }
        dispatch(signUpRequestAction({
          userId,
          password,
          }
        ));
    },[userId,password,confirmPassword]);

  return (
    <AuthFormBlock>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="userId"
          name="userId"
          placeholder="아이디"
          value={userId}
          onChange={onChangeUserId}
          
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placehoder="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
        

        <button>회원가입</button>
      </form>
      <Footer>
          <Link to="login">로그인</Link>
        
      </Footer>
    </AuthFormBlock>
  );
};

//autoComplete : 자동완성

export default SignupForm;
