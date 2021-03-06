import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {loginAction} from '../../reducers/user';
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import palette from "../../lib/styles/palette";
import {FcGoogle} from 'react-icons/fc'
import useInput from '../../hooks/useInput';
import config from "../../config";
import { loginRequestAction, isLoggedIn, GOOGLE_LOG_IN_REQUEST } from '../../reducers/user';

/** 로그인 폼 **/

const AuthFormBlock = styled.div`
  font-family : "Nanum Gothic", sans-serif;
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
    const history = useHistory();

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const { isLoggingIn, isLoggedIn,me } = useSelector(state=>state.user);
    const dispatch = useDispatch();


    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        dispatch(loginRequestAction({id,password}));
    },[id,password]);

    const googleLoginClick = () => {
      console.log('google');
      dispatch({
        type : GOOGLE_LOG_IN_REQUEST});
    }


    useEffect(()=>{
      if(isLoggedIn) history.push('/');
    },[isLoggedIn])


  return (
    <AuthFormBlock>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="userId"
          name="userId"
          placeholder="아이디"
          onChange={onChangeId}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChangePassword}
        />
        <button type="primary">로그인 </button>
        <div style={{ display: "flex", marginTop: "0.2rem" }}>
          <p>간편 로그인</p>
          <button
            type="button"
            style={{
              position: "relative",
              fontSize: "1.2rem",
              borderRadius: "50%",
            }}
          >
            <a href={`${config.base_URI}/api/user/google`}>
              <FcGoogle />
            </a>
          </button>
        </div>
      </form>
      <Footer>
        <Link to="/register">회원가입</Link>
      </Footer>
    </AuthFormBlock>
  );
};

//autoComplete : 자동완성

export default LoginForm;
