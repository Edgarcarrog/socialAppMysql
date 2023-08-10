import React, { useContext } from "react";
import { context } from "../../context/context";

const Modal = ({ children }) => {
  const { showModal } = useContext(context);

  return (
    <>
      <div className="modal-overlay" onClick={() => showModal(false)}></div>
      <div className="modal">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
