import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";
import Post from "./Post";
import ModalPost from "./ModalPost";
import { Link } from "react-router-dom";
import "../styles/info/info.css";

const InfoPage = () => {
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
    const user = getCookie("user");
    const logedUser = await clienteAxios.get(`/users/${user}`);
    addUser(logedUser.data.data);
    const myPosts = await clienteAxios.get(
      `/myposts/${logedUser.data.data.userId}`
    );
    setMyPosts(myPosts.data.data);
  };

  return (
    <>
      <ModalPost modal={modal} />
      <main className="container info-container">
        {<h2 className="user-title">{user && user.name}</h2>}
        <Link className="btn btn-danger" to="/edit-profile">
          Editar perfil
        </Link>
        {myposts &&
          myposts.map((post) => (
            <div key={post.Id}>
              <Post post={post} />
              <div className="post-foot">
                <button
                  className="btn btn-small btn-variant"
                  onClick={() => showModal(post.Id)}
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

export default InfoPage;
