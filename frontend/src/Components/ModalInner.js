import React, { useRef, useCallback, useState, useEffect } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import styled from "styled-components";
import Modal from "./Modal";
import config from '../config';
import ModalPortal from "./ModalPortal";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_DIARY_REQUEST,
  LOAD_DIARY_REQUSET,
  UPLOAD_IMAGES_REQUEST,
} from "../reducers/diary";


const ModalInner = ({showModal, setShowModal, date}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const diaries = useSelector((state) => state.diary.diaries);
  //넘어온 props date와 같은 날짜의 diaries만 미리 선택하여 가져옴 - 객체 형식
  const { imagePath } = useSelector((state) => state.diary);
  const imageInput = useRef();
  const [pageNumber, setPageNumber] = useState(0); //사진의 현재 page
  const [filteredImagePath, setFilteredImagePath] = useState([]);
  const [loading, setLoading] = useState(false);

  const onLoad = () => {
    console.log("load");
    dispatch({
      type: LOAD_DIARY_REQUSET,
      data: date,
    });
  };

  useEffect(() => {
    console.log("load");
    setFilteredImagePath([]);
    if (date.length > 4) onLoad(); //문자 판별이 안돼서 length로 함
  }, [date]);

  useEffect(() => {
    setPageNumber(0); //모달 새로 열릴 때마다 페이지 0이 되도록
  }, [date]);

    useEffect(() => {        
     const filtered = diaries.find(v => v.calendarDate === date);
     const previewImg = imagePath.filter(v=>v.includes(date));
     if(filtered) {
        setFilteredImagePath([filtered.img].concat(previewImg));
        console.log(filtered.content);
        setText(filtered.content);
     }else setFilteredImagePath(previewImg);
    },[date,diaries, imagePath]);

  // handler 함수들
  const onSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // diaries[imagePath].forEach((i) => {
    //   formData.append("image", i);
    // });

    filteredImagePath.forEach((i) => {
        formData.append('image',i);
    })

    formData.append("content", text);
    formData.append("calendarDate", date);
    dispatch({
      type: ADD_DIARY_REQUEST,
      data: formData,
    });
  };

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, [text]);

  /*
   * 버튼을 눌렀을 때 이미지 업로드하는 인풋창이 열리도록
   */
  const onClickImageUpload = useCallback(
    (e) => {
      e.preventDefault();
      imageInput.current.click(); //버튼을 눌렀을 때 input을 누른 것처럼 하는 효과
    },
    [imageInput.current]
  );

  /**
   *  올린 사진을 formData에 넣어야 바로 보임
   */
  const onChangeImages = (e) => {
    e.preventDefault();
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      const filename = `${date}_`; // 파일네임이 앞이 날짜로 돼도록
      imageFormData.append(
        "images",
        f,
        filename + e.target.files.length + ".jpg"
      ); //images 로 하면 서버쪽에서도 같은 이름으로 인식 (key,value)
      //submit하면 알아서 formdata가 서버로 전송되는데, 여기서는 바로 submit이 아니라 SPA를 유지하기 위해 ajax로 보낸다.
      //그래서 일일히 이미지 append

      dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData,
      });
    });
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="modal-header"></div>
      <ModalForm encType="multipart/form-data" onSubmit={onSubmitForm}>
        <div className="modal-image-wrapper">
          <StyleButton
            type="button"
            onClick={() => {
              pageNumber > 0 ? setPageNumber(pageNumber - 1) : null;
            }}
            style={{ left: "0" }}
          >
            <VscChevronLeft />
          </StyleButton>
          {filteredImagePath && filteredImagePath.length > 0 ? (
            <ModalImage
              src={`${config.base_URI}/${filteredImagePath[pageNumber]}`}
            />
          ) : null 
          }
          <StyleButton
            type="button"
            onClick={() => {
              pageNumber < filteredImagePath.length - 1
                ? setPageNumber(pageNumber + 1)
                : null;
            }}
            style={{ right: "0" }}
          >
            <VscChevronRight />
          </StyleButton>
          <button
            onClick={onClickImageUpload}
            style={{
              position: "relative",
              top: "100%",
              left: "35%",
              height: "1.5rem",
            }}
          >
            image
          </button>
        </div>
        <div>
          <textarea
            type="text"
            value={text} //value설정 안해줘서 content 안나왔었음.
            style={{
              fontSize: "25px",
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              marginLeft: "1rem",
              fontFamily: "Nanum Gothic, sans-serif",
            }}
            onChange={onChangeText}
          ></textarea>
          <input
            type="file"
            multiple
            hidden
            ref={imageInput} //직접적으로 돔에 접근해서 클릭해야되기 때문
            onChange={onChangeImages}
          ></input>
          <input
            type="submit"
            value="submit"
            style={{ position: "absolute", bottom: "0", right: "1rem" }}
          ></input>
        </div>
      </ModalForm>
    </Modal>
  );
};


const StyleButton = styled.button`
  position: absolute;
  top: 40%;
  height: 3rem;
  font-size: 30px;
  background-color: transparent;
  z-index: 1000;
`;

const ModalForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
`;

const ModalImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover; //가로세로 비율 유지하며 사이즈 조절. none 하면 이미지 가운데가 보여짐
  border-radius: 20px;
`;

export default ModalInner;