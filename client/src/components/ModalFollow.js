import React, { useEffect, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
// import "../styles/modal-follow.css";

const ModalFollow = () => {
  const { modal, showModal } = useContext(context);

  useEffect(() => {}, [modal]);

  const closeModal = () => {
    showModal(null);
  };

  //Elimina el follow con los Id's del usuario activo y del usuario seleccionado
  const unFollow = async (followingId) => {
    const user = localStorage.getItem("user");
    await clienteAxios.delete(
      `/follows?user=${user}&followingId=${followingId}`
    );
    showModal(null);
    modal.setFollowingBtn(false);
  };

  return (
    <article className={`modal-follow ${modal ? "is-open" : null}`}>
      <div className="modal-container">
        <p>¿Quieres dejar de seguir a {modal && modal.otherUser.name}?</p>
        <button
          className="btn"
          onClick={() => unFollow(modal.otherUser.userId)}
        >
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
