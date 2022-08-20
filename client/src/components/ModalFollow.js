import React, { useEffect, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import "../styles/modal-follow.css";

const ModalFollow = () => {
  const { modal, showModal } = useContext(context);

  useEffect(() => {
    console.log("modal.children", modal);
  }, [modal]);

  const closeModal = () => {
    showModal(null);
  };

  const unFollow = async (id) => {
    await clienteAxios.delete(`/follows/${id}`);
    showModal(null);
    modal.setFollowingBtn(false);
  };

  return (
    <article className={`modal-follow ${modal ? "is-open" : null}`}>
      <div className="modal-container">
        <p>¿Quieres dejar de seguir a {modal && modal.children.name}?</p>
        <button className="btn" onClick={() => unFollow(modal.children.Id)}>
          Dejar de seguir
        </button>
        <button className="btn" onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </article>
  );
};

export default ModalFollow;
