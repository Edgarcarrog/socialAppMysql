import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import Post from "../components/Post";
import "../styles/profile/profile.css";
import ModalComment from "../components/ModalComment";
import validateUser from "../helpers/validateUser";

const ProfilePage = () => {
  const { user, posts, addUser, setPosts, showModal } = useContext(context);

  const [description, setDescription] = useState("");
  const [activeModal, setActiveModal] = useState(false);

  useEffect(() => {
    try {
      //TODO
      //setUsers();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUsers = async () => {
    const logedUser = await clienteAxios.get(`/users/${user}`);
    addUser(logedUser.data.data);
    const posts = await clienteAxios.get(
      `/posts/${logedUser.data.data.userId}`
    );
    setPosts(posts.data.data);
  };

  const sendPost = async (description) => {
    if (description.trim()) {
      await clienteAxios.post(`/posts/${user.userId}`, {
        description: description.trim(),
      });
      setDescription("");
    }
  };

  const handleChange = (e) => {
    if (e.target.value.trim().length <= 255) {
      setDescription(e.target.value);
    }
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
          <button
            className="btn btn-primary"
            onClick={() => sendPost(description)}
          >
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
