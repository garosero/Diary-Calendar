import React, {useRef, useCallback} from "react";
import ReactDOM from "react-dom";
import CloseButton from "./CloseButton"
import styled from 'styled-components';

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



const Modal = ({ isShowing, hide, children }) => {

  const onSubmitForm = () => {
    
  }

  const imageInput = () => {

  }

  const onClickImageUpload = ()=>{

  }

  const onChangeImages = () => {

  }

 return (
   <>
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
             <CloseButton onClick={hide}>
               <span aria-hidden="true">&times;</span>
             </CloseButton>
           </div>
           {/* <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}>
                  {children}
                  <button onClick={onClickImageUpload}>이미지 업로드</button>
                </input> */}
           {children}
         </form>
       </div>
     </ModalWrapper>
   </>
 );
 
}
    
  

export default Modal;
