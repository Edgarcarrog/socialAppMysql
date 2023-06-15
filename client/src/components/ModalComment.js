import React, { useEffect, useState, useContext } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import "../styles/modalPost/modal_post.css";

const ModalComment = ({ active, setActiveModal }) => {
    const { modal, showModal } = useContext(context);

    const [description, setDescription] = useState("");

    /* useEffect(() => {
      if (modal) setDescription(modal.description);
    }, [modal]); */

    //Actualiza el post con el Id del post seleccionado
    const commentPost = async (postId) => {
      console.log(postId);
      //await clienteAxios.put(`/posts/${postId}`, { description });
      setActiveModal(false);
      showModal(null);
    };

    const handleChange = (e) => {
      setDescription(e.target.value);
    };

  return (
    <article className={`modal-follow ${active ? "is-open" : null}`}>
      <div className="modal-container">
        <p>{modal && modal.description}</p>
        <textarea
          className="post__area"
          name="message"
          rows="5"
          //   placeholder="Comparte un mensaje"
          value={description}
          onChange={handleChange}
        />
        <button className="btn" onClick={() => commentPost(modal.Id)}>
          Comentar
        </button>
        <button
          className="btn"
          onClick={() => {
            showModal(null);
            setActiveModal(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </article>
  );
};

export default ModalComment;
