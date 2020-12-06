import React, {useRef, useCallback, useState, useEffect} from "react";
import CloseButton from "./CloseButton"
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_DIARY_REQUEST, UPLOAD_IMAGES_REQUEST } from "../reducers/diary";

const Overlay = styled.div`
  display: ${(props) => (props.showModal ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

const ModalWrapper = styled.div`
  display : ${(props) => (props.showModal) ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

const StyleButton = styled.button`
  background-color: #dee2e6;
  margin : 2em;
  height : 3rem;
`;




const Modal = ({ showModal, setShowModal, children }) => {

  return (
    <ModalPortal elementId="modal-portal">
      <Overlay showModal={showModal} />
      <ModalWrapper
        showModal={showModal}
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal" showModal={showModal}>
          <button onClick={()=>{setShowModal((prev)=>!prev);}}>X</button>
          {children}
        </div>
      </ModalWrapper>
    </ModalPortal>
  );
};
    
  

export default Modal;
