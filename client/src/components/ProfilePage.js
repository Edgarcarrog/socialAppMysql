import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import { getCookie } from "../helpers/cookie";
import Post from "./Post";
import "../styles/profile/profile.css";

const ProfilePage = () => {
  const { user, posts, addUser, setPosts } = useContext(context);

  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      setUsers();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUsers = async () => {
    const user = getCookie("user");
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
        {posts && posts.map((post) => <Post key={post.Id} post={post} />)}
      </div>
    </div>
  );
};

export default ProfilePage;
