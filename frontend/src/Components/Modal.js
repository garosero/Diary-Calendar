import React, {useRef, useCallback} from "react";
import ReactDOM from "react-dom";
import CloseButton from "./CloseButton"
import styled from 'styled-components';
import useModal from "./useModal";
import ModalPortal from './ModalPortal';

const Overlay = styled.div`
  display: ${(props) => (props.isShowing ? 'block' : 'none')};
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
  display : ${(props) => (props.isShowing) ? 'block' : 'none'};
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



const Modal = ({ isShowing, onClose }) => {

  console.log("modal에서 isShowing"+isShowing);

  const onSubmitForm = () => {
    e.preventDefault();
    
  }

  const imageInput = () => {

  }

  const onClickImageUpload = (e) =>{
    e.preventDefault(); // submit과 동시에 refresh 되는 것을 막음 
    // e.stopPropagation(); //이거 하나만 쓰면 전파는 안되는데 refresh 되어버림. submit (toggle이 아니라 refresh때문에 그런거 )

  }

  const onChangeImages = () => {

  }


 return (
   <ModalPortal elementId='modal-portal'>
     <Overlay isShowing={isShowing} />
     <ModalWrapper
       isShowing={isShowing}
       aria-modal
       aria-hidden
       tabIndex={-1}
       role="dialog"
      
     >
       <div className="modal">
         <form
           style={{ margin: "10px 0 20px" }}
           encType="multipart/form-data"
           onSubmit={onSubmitForm}
         >
           <div className="modal-header">
             <CloseButton onClick={onClose} value="X" />
           </div>
           <input
             type="file"
             multiple
             hidden
             ref={imageInput}
             onChange={onChangeImages}
           ></input>
       
           <button type="submit" onClick={onClickImageUpload}>image</button>
         </form>
       </div>
     </ModalWrapper>
   </ModalPortal>
 );
 
}
    
  

export default Modal;
