import React, { useContext, useEffect } from "react";
import Post from "../components/Post";
import { context } from "../context/context";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import authToken from "../helpers/authToken";

const ProfilePage = () => {

  const { user, myposts, addUser, modal, showModal, setMyPosts } =
  useContext(context);

  useEffect(() => {
    try {
      setPosts();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPosts = async () => {
    authToken();
    const token = localStorage.getItem("user");
    const myPosts = await clienteAxios.get(
      `/myposts/${token}`
    );
    setMyPosts(myPosts.data.data);
  };

  return (
    <>
      {/* <ModalPost
        active={activeModal.isModalDelete}
        setActiveModal={setActiveModal}
      />
      <ModalEditPost
        active={activeModal.isModalUpdate}
        setActiveModal={setActiveModal}
      /> */}
      <main className="container info-container">
        {<h2 className="user-title">{user && user.name}</h2>}
        <div className="buttons-container">
          <Link className="btn btn-primary btn-small" to="/following">
            Siguiendo
          </Link>
          <Link className="btn btn-primary btn-small" to="/followers">
            Seguidores
          </Link>
          <Link className="btn btn-primary btn-small" to="/edit-profile">
            Editar perfil
          </Link>
        </div>
        <div>
          <h3>Mis publicaciones</h3>
        </div>
        {myposts &&
          myposts.map((post) => (
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
      </main>
    </>
  );
};

export default ProfilePage;
