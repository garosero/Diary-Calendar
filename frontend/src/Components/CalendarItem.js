import React, {useState} from "react";
import Modal from './Modal'
import styled from "styled-components";
import CloseButton from './CloseButton';

// const ItemDiv = styled.div`
//   font-size: 14px;
//   line-height: 30px;
//   border-right: #dadce0 1px solid;
//   flex: 1 1 0%;
//   text-align: center;
//   font-family: Roboto, Arial, sans-serif;
//   text-transform: uppercase;
//   &:hover {
//     background-color: #e6e6fa;
//   }
// `;

const CalendarItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const data = "";

  return (
    <div className="item" onClick={openModal}>
      {
        modalVisible && <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          >
    
        </Modal>
      }
      {props.day > 0 ? props.day : ""}
      <br />
      {data}
    </div>
  );
};

export default CalendarItem;
