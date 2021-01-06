import React, { useState, useEffect, useCallback } from "react";
import MonthChangeButton from './MonthChangeButton';
import "./Calendar.scss";
import { Link } from "react-router-dom";
import {loginRequestAction, logoutRequestAction} from '../reducers/user';
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';


const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.user); //redux state를 가져다 쓰기 
  //const {diaries} = useSelector(state => state.diary); //diaries 아님 
  

  const onLogout = useCallback(()=>{
    dispatch(logoutRequestAction);
  })

  const loginHandler = () => {
    if(isLoggedIn) onLogout();
    else history.push('/Login');
  }

  return (
    <div className="Header">
      <MonthChangeButton className="Header-item" />
      <button className="Header-item-login" onClick={loginHandler}>
        {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
      </button>
    </div>
  );
};

export default Header;
