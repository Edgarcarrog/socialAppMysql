import React, { useContext } from "react";
import { context } from "../../context/context";

const Modal = ({ children }) => {
  const { showModal, modal } = useContext(context);

  let { top, bottom, right, width } = modal.position;
  right = window.innerWidth - right - width;
  let positionY;

  if (top > window.innerHeight / 2) {
    top = window.innerHeight - bottom - window.scrollY;
    positionY = "bottom";
  } else {
    top = top + window.scrollY;
    positionY = "top";
  }

  const style = {
    [positionY]: top + "px",
    right: right + "px",
  };

  const closeModal = () => showModal(null);

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal" style={style}>
        <div
          className="modal-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
