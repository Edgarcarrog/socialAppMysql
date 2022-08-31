import React, { useEffect, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import "../styles/modal-follow.css";

const ModalPost = ({ isOpen }) => {
  console.log(isOpen);
  const { user, modal, showModal } = useContext(context);

  useEffect(() => {}, [modal]);

  const closeModal = () => {
    showModal(null);
  };

  return (
    <article className={`modal-follow ${isOpen ? "is-open" : null}`}>
      <div className="modal-container">
        <p>¿Quieres dejar de seguir a {modal && modal.followUser.name}?</p>
        <button className="btn" onClick={() => {}}>
          Publicar
        </button>
        <button className="btn" onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </article>
  );
};

export default ModalPost;
