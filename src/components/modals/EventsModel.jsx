import React, { useState } from 'react';
import '../../css/models.css'

const Modal = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content dark-theme">
            <span className="close" onClick={handleClose}>&times;</span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
