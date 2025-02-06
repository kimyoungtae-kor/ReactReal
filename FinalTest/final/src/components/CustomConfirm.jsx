import React, { useState } from "react";
import { Modal, Button, ModalHeader } from "react-bootstrap";

const CustomConfirm = () => {
  const [confirm, setConfirm] = useState({
    show: false,
    message: "",
    resolve: null,
    reject: null,
  });
  const showConfirm = (message) => {
    return new Promise((resolve, reject) => {
      setConfirm({ show: true, message,resolve, reject });
    });
  };

  const handleConfirm = () => {
    if (confirm.resolve) confirm.resolve(true);
    setConfirm({ show: false, message: "", resolve: null, reject: null });
  };

  const handleCancel = () => {
    if (confirm.reject) confirm.reject(false);
    setConfirm({ show: false, message: "", resolve: null, reject: null });
  };

  return (
    <div>
      <Button
        variant="info"
        onClick={() =>
          showConfirm("정말 삭제하시겠습니까?")
            .then(() => alert("삭제되었습니다."))
            .catch(() => alert("취소되었습니다."))
        }
      >
        컨펌
      </Button>

      <Modal show={confirm.show} onHide={handleCancel} centered>
        {/* <Modal.Header closeButton> */}
        <Modal.Header style={{ backgroundColor:"#17a2b8", color: "#fff" }}>
          <Modal.Title >확인</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">{confirm.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomConfirm;
