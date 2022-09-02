import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import { getCookie } from "../helpers/cookie";
import Post from "./Post";

const HomePage = () => {
  const {
    user,
    posts,
    addUser,
    setAllUsers,
    setFollowers,
    setFollowing,
    setPosts,
  } = useContext(context);

  const [description, setDescription] = useState("");

  const setUsers = async () => {
    const user = getCookie("user");
    const [logedUser, allUsers, following, followers] = await Promise.all([
      clienteAxios.get(`/users/${user}`),
      clienteAxios.get(`/allusers/${user}`),
      clienteAxios.get(`/following/${user}`),
      clienteAxios.get(`/followers/${user}`),
    ]);

    addUser(logedUser.data.data);
    setAllUsers(allUsers.data.data);
    setFollowing(following.data.data);
    setFollowers(followers.data.data);

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

  useEffect(() => {
    try {
      setUsers();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <div className="post__container">
        <textarea
          className="post__area"
          name="message"
          rows="5"
          placeholder="Comparte un mensaje"
          value={description}
          onChange={handleChange}
        />
        <button className="btn" onClick={() => sendPost(description)}>
          Crear Post
        </button>
      </div>
      <Link className="btn" to="/profile">
        Perfil
      </Link>
      {posts && posts.map((post) => <Post key={post.Id} post={post} />)}
    </div>
  );
};

export default HomePage;
