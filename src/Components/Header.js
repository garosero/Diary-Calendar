import React, {useState, useEffect} from 'react';
import './Calendar.scss'


const Header = (props) => {
    

    return (
    
        <div className="Header" >
            {props.children}
        </div>
    
    )
}

export default Header;