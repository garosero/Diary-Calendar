import React, {useRef, useCallback, useState, useEffect} from "react";
import ReactDOM from "react-dom";
import CloseButton from "./CloseButton"
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import { useSelector, useDispatch } from 'react-redux';
import { UPLOAD_IMAGES_REQUEST } from "../reducers/diary";

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



const Modal = ({ showModal, setShowModal }) => {
  
  useEffect(() => {
    console.log('modal showModal : '+showModal);
  }, [showModal])

  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const {imagePath, isAddingDiary, diaryAdded } = useSelector(state=>state.diary);
  const imageInput = useRef();
  
  const onSubmitForm = (e) => { 
    e.preventDefault();
    console.log('onSubmitForm');
    
  }

  /**
   *  버튼을 눌렀을 때 
   *  실제 이미지 업로드 하는 인풋창이 열리게끔
   */ 
  const onClickImageUpload = useCallback((e) =>{
    console.log('onClickImageUpload');
     e.preventDefault() //submit과 동시에 refresh 되는 것을 막음 
    // e.stopPropagation(); //이거 하나만 쓰면 전파는 안되는데 refresh 되어버림. submit (toggle이 아니라 refresh때문에 그런거 )
    imageInput.current.click(); //<-- 버튼을 눌렀을 때 input을 누른 것처럼 하는 효과
    console.log('imageInput.current'+imageInput.current);
  },[imageInput.current]);


  /**
   * 실제로 이미지를 업로드 했을 때 작동하게끔
   * 
   */
  const onChangeImages = useCallback((e) => {
    console.log("onChangeImages");
    console.log(e.target.files[0]);
    const imageFormData = new FormData(); //formData 객체 안에 이미지 파일 하나씩 넣기
    [].forEach.call(e.target.files, (f)=>{
      imageFormData.append('images',f); //'image'로 서버쪽에서도 같은 이름으로 인식  (key,value)
      //submit하면 알아서 formdata가 서버로 전송되는데, 여기서는 바로 submit이 아니라 SPA를 유지하기 위해 ajax로 보낸다. 그래서 일일히 이미지 append
    });
    console.log(imageFormData.get('images'));
    dispatch({
      type:UPLOAD_IMAGES_REQUEST,
      data : imageFormData,
    })
  },[]);


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
         {/* <CloseButton onClick={onClose} value="X" /> */}
         <button onClick={()=>setShowModal(prev=>!prev)}>X</button>
         <form
           style={{ margin: "10px 0 20px" }}
           encType="multipart/form-data"
           onSubmit={onSubmitForm}
         >
           <div className="modal-header"></div>
           <input
             type="file"
             multiple
             hidden
             ref={imageInput} //직접적으로 돔에 접근해서 클릭해야되기 때문
             onChange={onChangeImages}
           ></input>

           <button onClick={onClickImageUpload}>image</button>
           <div>
             {imagePath.map((v,i) => (
               <div key={v} style={{ display : 'inline-block'}}>
                  <img src={`http://localhost:3000/${v}`} style={{width :'200px'}} alt={v} />
               </div>
             ))

             }
           </div>
         </form>
       </div>
     </ModalWrapper>
   </ModalPortal>
 );
 
}
    
  

export default Modal;
