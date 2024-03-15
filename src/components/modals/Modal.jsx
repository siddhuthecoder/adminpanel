import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const CustomModal = ({ showModal, closeModal, children }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      centered
      contentClassName="dark-modal-content"
      backdropClassName="dark-modal-backdrop"
      dialogClassName="custom-modal-dialog"
    >

      <Modal.Body className="bg-dark" style={{ width: "100%", maxWidth: "1000px" }}>
        <div className="w-100 d-flex align-items-center flex-row-reverse">
          <AiOutlineClose
            style={{ color: "white", fontSize: "30px", marginRight: "-15px", marginTop: "-15px", cursor: "pointer" }}
            onClick={handleClose}
          />
        </div>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
