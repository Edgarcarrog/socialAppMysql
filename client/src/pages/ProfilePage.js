import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import Post from "../components/Post";
import "../styles/profile/profile.css";
import ModalComment from "../components/ModalComment";
import authToken from "../helpers/authToken";
import validateUser from "../helpers/validateUser";

const ProfilePage = () => {
  const { user, posts, setPosts, showModal } = useContext(context);

  const [description, setDescription] = useState("");
  const [activeModal, setActiveModal] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.trim().length <= 255) {
      setDescription(e.target.value);
    }
  };

  const sendPost = async (e) => {
    await clienteAxios.post(`/posts/${user}`, { description });
    setDescription("");
  };

  return (
    <>
      <div className="container profile__container">
        <div className="post__container">
          <textarea
            className="post__area"
            name="message"
            rows="5"
            placeholder="Comparte un mensaje"
            value={description}
            onChange={handleChange}
          />
          <button className="btn btn-primary" onClick={sendPost}>
            Publicar
          </button>
        </div>
        <div className="btn-container">
          <Link className="btn btn-primary btn-small" to="/info">
            Mi información
          </Link>
        </div>
        <div>
          <h3>Últimas publicaciones</h3>
        </div>
        <div className="posts-container">
          {posts &&
            posts.map((post) => (
              <div key={post.Id}>
                <Post post={post} />
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => {
                    showModal(post);
                    setActiveModal(true);
                  }}
                >
                  Comentar
                </button>
              </div>
            ))}
        </div>
      </div>
      <ModalComment active={activeModal} setActiveModal={setActiveModal} />
    </>
  );
};

export default ProfilePage;
