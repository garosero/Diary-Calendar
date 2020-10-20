import React, { useState, useEffect } from "react";
import MovePageButton from './MovePageButton';
import "./Calendar.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
  <div className="Header">
      <MovePageButton />
      <button>
          <Link to="/Login">Login</Link>
      </button>
  </div>
  )
};

export default Header;
