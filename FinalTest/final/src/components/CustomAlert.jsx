import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CustomAlert = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "primary",
  });

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });

  };

  return (
    <div className="btn-group">
      <Button variant="success" onClick={() => showAlert("성공적으로 처리되었습니다!", "primary")}>
        Success
      </Button>
      <Button variant="danger" onClick={() => showAlert("오류가 발생했습니다!", "danger")}>
        Error
      </Button>
      <Button variant="warning" onClick={() => showAlert("경고 메시지!", "warning")}>
        Warning
      </Button>
      <Button variant="info" onClick={() => showAlert("정보 메시지입니다.", "info")}>
        Info
      </Button>

      
      <Modal show={alert.show} onHide={() => setAlert({ show: false })} centered>
        <Modal.Header closeButton className={`bg-${alert.variant} text-white`}>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">{alert.message}</Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomAlert;
