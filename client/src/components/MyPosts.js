import React from "react";
import Post from "./Post";

const MyPosts = ({ myposts }) => {
  return (
    <div>
      {myposts.map((post) => (
        <div key={post.Id}>
          <Post post={post} />
          <div className="post-foot">
            <button
              className="btn btn-small btn-variant"
              /* onClick={() => {
                  showModal(post);
                  setActiveModal({
                    isModalDelete: false,
                    isModalUpdate: true,
                  });
                }} */
            >
              Editar
            </button>
            <button
              className="btn btn-small btn-variant"
              /* onClick={() => {
                  showModal(post.Id);
                  setActiveModal({
                    isModalDelete: true,
                    isModalUpdate: false,
                  });
                }} */
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
