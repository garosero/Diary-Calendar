import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CloseButton from './CloseButton';

const Modal = ({className, onClose, maskClosable, closable, visible, children}) => {
   const onMaskClick = (e) => {
       if(e.target === e.currentTarget){
           onClose(e);  //closeModal()
       }
   }

   const close = (e) => {
       console.log("close");
       console.log(onClose);
       if(onClose)
   }

   useEffect(() => {
    //  document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
     return () => {
       const scrollY = document.body.style.top;
       document.body.style.cssText = `position: ""; top: "";`;
       window.scrollTo(0, parseInt(scrollY || "0") * -1);
     };
   }, []);

    return (
        <>
            <ModalOverlay visible={visible} />
            <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null}tabIndex="-1" visible={visible}>
                <ModalInner tabIndex="0" className="modal-inner" onClick={close}>
                    {closable && <CloseButton className="modal-close"/>}
                    {children}
                </ModalInner>
            </ModalWrapper>
        </>
    );
    
}

Modal.defaultProps = {
    closable : true,
    maskClosable : true,
    visible : false
}

const ModalWrapper = styled.div`
    box-sizing : border-box;
    display : ${(props) => (props.visible ? 'block' : 'none')};
    position : fixed;
    top : 0;
    right : 0;
    bottom : 0;
    left : 0;
    z-index : 1000;
    overflow : auto;
    outline : 0;
`;

const ModalOverlay = styled.div`
    box-sizing : border-box;
    display : ${(props)=>(props.visible ? 'block' : 'none')};
    position : fixed;
    top : 0;
    left : 0;
    bottom : 0;
    right : 0;
    background-color : rgba(0, 0, 0, 0.1);
    z-index : 999;
`;

const ModalInner = styled.div`
    box-sizing : border-box;
    position : absolute;
    box-shadow : 0 0 5px 0 rgba(0, 0, 0, 0.5);
    background-color : #fff;
    border-radius : 10px;
    width : 750px;
    max-width : 800px;
    top : 50%;
    height : 500px;
    left : 50%;
    transform : translate(-50%,-50%);
    /* padding : 40px 20px;  */
`;



export default Modal;
