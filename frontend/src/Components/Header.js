import React, { useState, useEffect } from "react";
import MovePageButton from './MovePageButton';
import "./Calendar.scss";
import { Link } from "react-router-dom";
import {loginAction} from '../reducers/user';
import { useDispatch, useSelector } from "react-redux";



const Header = () => {
  const dispatch = useDispatch();
  const {isLoggedIn,user} = useSelector(state => state.user); //redux state를 가져다 쓰기 
  const {diaries} = useSelector(state => state.diary); //diaries 아님 
  console.log(user);
  useEffect(()=>{
    dispatch(loginAction);
  },[]);

  return (
    <div className="Header">
      <MovePageButton className="Header-item" />
      {user ? (
      
          <button className="Header-item-login">Logout</button>
      
      ) : (
        <button className="Header-item-login">
          <Link to="/Login">Login</Link>
        </button>
      )}
    </div>
  );
};

export default Header;
