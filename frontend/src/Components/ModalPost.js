import React, { useRef, useCallback, useState, useEffect } from "react";
import Modal from './Modal';
import CloseButton from "./CloseButton";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import styled from "styled-components";
import ModalPortal from "./ModalPortal";
import { useSelector, useDispatch } from "react-redux";
import { ADD_DIARY_REQUEST, LOAD_DIARY_REQUSET, UPLOAD_IMAGES_REQUEST } from "../reducers/diary";

const StyleButton = styled.button`
  background-color: #dee2e6;
  margin: 2em;
  height: 3rem;
`;

const ModalPost = ({showModal, setShowModal, date}) => {

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { imagePath, isAddingDiary, diaryAdded, content } = useSelector(
    (state) => state.diary
  );
  const imageInput = useRef();
  const [pageNumber, setPageNumber] = useState(0); //여러 이미지 파일들의 index (click button으로 넘기기위해)
  const [filteredImagePath, setFilteredImagePath] = useState([]);
  //const imageFormData = new FormData(); //formData 객체 안에 이미지 파일 하나씩 넣기

  const onLoad = () => {
    console.log('date : '+date);
    dispatch({
      type : LOAD_DIARY_REQUSET,
      data : date
    });
  }

  useEffect(()=>{
    console.log('load');
    onLoad();
  },[date]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("imagePath : " + imagePath);
    imagePath.forEach((i) => {
      formData.append("image", i);
    });

    formData.append("content", text);
    formData.append("calendarDate",date);
    dispatch({
      type: ADD_DIARY_REQUEST,
      data: formData,
    });
  };

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  useEffect(()=>{
    setPageNumber(0);   //모달이 새로 열릴 때 페이지 0이 되도록
  },[showModal]);

  /**
   *  버튼을 눌렀을 때
   *  실제 이미지 업로드 하는 인풋창이 열리게끔
   */
  const onClickImageUpload = useCallback(
    (e) => {
      e.preventDefault(); //submit과 동시에 refresh 되는 것을 막음
      // e.stopPropagation(); //이거 하나만 쓰면 전파는 안되는데 refresh 되어버림. submit (toggle이 아니라 refresh때문에 그런거 )
      imageInput.current.click(); //<-- 버튼을 눌렀을 때 input을 누른 것처럼 하는 효과
    },
    [imageInput.current]
  );

  /**
   * 실제로 이미지를 업로드 했을 때 작동하게끔
   *
   */
  const onChangeImages = (e) => {
    e.preventDefault();
    const imageFormData = new FormData(); //formData 객체 안에 이미지 파일 하나씩 넣기
    [].forEach.call(e.target.files, (f) => {
      const filename = `${date}_`;
      imageFormData.append(
        "images",
        f,
        filename + e.target.files.length + ".jpg"
      ); //'image'로 서버쪽에서도 같은 이름으로 인식  (key,value)
      //submit하면 알아서 formdata가 서버로 전송되는데, 여기서는 바로 submit이 아니라 SPA를 유지하기 위해 ajax로 보낸다. 그래서 일일히 이미지 append
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }; //useCallback을 사용하면 date가 적용이 안됨...

  useEffect(() => {
    setFilteredImagePath(imagePath.filter((v) => v.includes(date)));
  }, [imagePath, date]);

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
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

        <div className="modal-image-wrapper">
          <StyleButton
            onClick={() => {
              pageNumber > 0 ? setPageNumber(pageNumber - 1) : null;
            }}
          >
            <VscChevronLeft />
          </StyleButton>
          <div>
            {filteredImagePath.length > 0 ? (
              <img
                src={`http://localhost:3000/${filteredImagePath[pageNumber]}`}
                style={{ width: "40%" }}
              />
            ) : null}
          </div>
          <textarea
            type="text"
            style={({ border: "none", borderBottom : '1px'})}
            onChange={onChangeText}
          ></textarea>
          <StyleButton
            onClick={() => {
              pageNumber < filteredImagePath.length - 1
                ? setPageNumber(pageNumber + 1)
                : null;
            }}
          >
            <VscChevronRight />
          </StyleButton>
        </div>
        <input type="submit" value="submit"></input>
      </form>
    </Modal>
  );
};

export default ModalPost
