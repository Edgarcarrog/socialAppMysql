import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { context } from "../../context/context";
import Post from "../../components/Post";
// import "../styles/profile/profile.css";
import ModalComment from "../../components/ModalComment";
import authToken from "../../helpers/authToken";
import HomeNav from "./components/HomeNav";
import HomeForm from "./components/HomeForm";
import Modal from ".././../components/Modal/Modal";

const HomePage = () => {
  const { posts, setPosts, modal, showModal } = useContext(context);

  useEffect(() => {
    showModal(null);
    try {
      setData();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setData = async () => {
    authToken();
    const token = localStorage.getItem("user");
    const posts = await clienteAxios.get(`/otherposts/${token}`);
    setPosts(posts.data.data);
  };

  return (
    <>
      {modal && (
        <Modal>
          <h2>Contenido del Modal</h2>
          <p>
            Este es el contenido del modal. Haz clic fuera de él para cerrarlo.
          </p>
        </Modal>
      )}
      <main className="main__container">
        <HomeNav />
        <HomeForm />
        <div className="btn-container"></div>
        <div>
          <h3>Últimas publicaciones</h3>
        </div>
        <div className="posts-container">
          {posts &&
            posts.map((post) => (
              <div key={post.Id}>
                <Post post={post} updateFunc={setData} />
                {/* <button
                  className="btn btn-primary btn-small"
                  onClick={() => {
                    showModal(post);
                    setActiveModal(true);
                  }}
                >
                  Comentar
                </button> */}
              </div>
            ))}
        </div>
      </main>
      {/* TODO
       <ModalComment active={activeModal} setActiveModal={setActiveModal} /> */}
    </>
  );
};

export default HomePage;
