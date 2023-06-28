import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { context } from "../context/context";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import authToken from "../helpers/authToken";
import MyPosts from "../components/MyPosts";
import Following from "../components/Following";

const ProfilePage = () => {
  const {
    user,
    myposts,
    modal,
    showModal,
    setMyPosts,
    following,
    setFollowing,
  } = useContext(context);

  const [display, setDisplay] = useState("myposts");

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
    const [myPosts, following] = await Promise.all([
      clienteAxios.get(`/myposts/${token}`),
      clienteAxios.get(`/following/${token}`),
    ]);
    setMyPosts(myPosts.data.data);
    setFollowing(following.data.data);
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
          <button
            className="btn btn-primary btn-small"
            onClick={() => setDisplay("myposts")}
          >
            Mis Publicaciones
          </button>
          <button
            className="btn btn-primary btn-small"
            onClick={() => setDisplay("following")}
          >
            Siguiendo
          </button>
          <button
            className="btn btn-primary btn-small"
            onClick={() => setDisplay("followers")}
          >
            Seguidores
          </button>
          <Link className="btn btn-primary btn-small" to="/edit-profile">
            Editar perfil
          </Link>
        </div>
        <div>
          <h3>Mis publicaciones</h3>
        </div>
        {myposts && display === "myposts" && <MyPosts myposts={myposts} />}
        {following && display === "following" && (
          <Following following={following} />
        )}
      </main>
    </>
  );
};

export default ProfilePage;
