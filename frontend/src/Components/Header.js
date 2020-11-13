import React, { useState, useEffect, useCallback } from "react";
import MovePageButton from './MovePageButton';
import "./Calendar.scss";
import { Link } from "react-router-dom";
import {loginAction, logoutAction} from '../reducers/user';
import { useDispatch, useSelector } from "react-redux";



const Header = () => {
  const dispatch = useDispatch();
  const {isLoggedIn,user} = useSelector(state => state.user); //redux state를 가져다 쓰기 
  const {diaries} = useSelector(state => state.diary); //diaries 아님 
  
  

  const onLogout = useCallback(()=>{
    dispatch(logoutAction);
  })

  return (
    <div className="Header">
      <MovePageButton className="Header-item" />
      {isLoggedIn ? (
        <button className="Header-item-login" onClick={onLogout}>
          Logout
        </button>
      ) : (
        <button className="Header-item-login">
          <Link to="/Login">Login</Link>
        </button>
      )}
    </div>
  );
};

export default Header;
