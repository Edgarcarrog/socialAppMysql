import React, { useEffect, useState, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import "../styles/modalPost/modal_post.css";

const ModalEditPost = ({ active, setActiveModal }) => {
  const { modal, showModal } = useContext(context);

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (modal) setDescription(modal.description);
  }, [modal]);

  //Actualiza el post con el Id del post seleccionado
  const updatePost = async (postId) => {
    console.log("borrando el post con id: " + postId);
    await clienteAxios.put(`/posts/${postId}`, { description });
    setActiveModal({
      isModalDelete: false,
      isModalUpdate: false,
    });
    showModal(null);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <article className={`modal-follow ${active ? "is-open" : null}`}>
      <div className="modal-container">
        <textarea
          className="post__area"
          name="message"
          rows="5"
          placeholder="Comparte un mensaje"
          value={description}
          onChange={handleChange}
        />
        <button className="btn" onClick={() => updatePost(modal.Id)}>
          Guardar Cambios
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

export default ModalEditPost;
