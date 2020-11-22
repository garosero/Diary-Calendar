import React from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({children}) => {
    const el = document.getElementById('modal-portal');
    return ReactDOM.createPortal(children,el);
}

export default ModalPortal;