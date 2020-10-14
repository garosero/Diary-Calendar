import React, { useState, useEffect } from "react";
import MovePageButton from './MovePageButton';
import "./Calendar.scss";

const Header = () => {
  return (
  <div className="Header">
      <MovePageButton />
      <button>
          Login
      </button>
  </div>
  )
};

export default Header;
