import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// eslint-disable-next-line react/prop-types
function ModalConfirm({
  btnName,
  modalTitle,
  modalBody,
  btnClickHandler,
  isDisabled,
  className
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const okHandler = () => {
    btnClickHandler();
    handleClose();
  };
  console.log("changed");
  return (
    <>
      <button className={className} disabled={isDisabled} onClick={handleShow}>
        {btnName}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={okHandler}>
            Ok
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
