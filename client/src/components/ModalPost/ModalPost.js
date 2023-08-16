import React, { useContext } from "react";
import { context } from "../../context/context";

const ModalPost = () => {
  const {
    modal: { post },
  } = useContext(context);
  const { userName, postId, userId } = post;
  return (
    post && (
      <section className="edit-post">
        <div className="edit-post__delete">
          <span>Dar una calificación</span>
        </div>
        <div>
          <span>Seguir a {userName}</span>
        </div>
      </section>
    )
  );
};

export default ModalPost;
