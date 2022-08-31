import React, { useEffect, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import "../styles/modal-follow.css";

const ModalFollow = () => {
  const { user, modal, showModal } = useContext(context);

  useEffect(() => {}, [modal]);

  const closeModal = () => {
    showModal(null);
  };

  //Elimina el follow con los Id's del usuario activo y del usuario seleccionado
  const unFollow = async (followingId) => {
    console.log("borrando el follow con id: " + followingId);
    await clienteAxios.delete(
      `/follows?followerId=${user.userId}&followingId=${followingId}`
    );
    showModal(null);
    modal.setFollowingBtn(false);
  };

  return (
    <article className={`modal-follow ${modal ? "is-open" : null}`}>
      <div className="modal-container">
        <p>¿Quieres dejar de seguir a {modal && modal.followUser.name}?</p>
        <button
          className="btn"
          onClick={() => unFollow(modal.followUser.userId)}
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
