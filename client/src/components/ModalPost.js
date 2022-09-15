import React, { useEffect, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import "../styles/modalPost/modal_post.css";

const ModalPost = ({ active, setActiveModal }) => {
  const { modal, showModal, deleteMyPost } = useContext(context);

  useEffect(() => {}, [modal]);

  //Elimina el post con el Id del post seleccionado
  const deletePost = async (postId) => {
    console.log("borrando el post con id: " + postId);
    await clienteAxios.delete(`/posts/${postId}`);
    deleteMyPost(postId);
    setActiveModal({
      isModalDelete: false,
      isModalUpdate: false,
    });
    showModal(null);
  };

  return (
    <article className={`modal-follow ${active ? "is-open" : null}`}>
      <div className="modal-container">
        <p>¿Quieres eliminar la publicación?</p>
        <button className="btn" onClick={() => deletePost(modal)}>
          Aceptar
        </button>
        <button
          className="btn"
          onClick={() => {
            showModal(null);
            setActiveModal({
              isModalDelete: false,
              isModalUpdate: false,
            });
          }}
        >
          Cancelar
        </button>
      </div>
    </article>
  );
};

export default ModalPost;
