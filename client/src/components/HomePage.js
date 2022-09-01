import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import { getCookie } from "../helpers/cookie";

const HomePage = () => {
  const { user, addUser, setAllUsers, setFollowers, setFollowing } =
    useContext(context);

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
  };

  const sendPost = async (description) => {
    console.log("pasó por sendPost", description);
    await clienteAxios.post(`/posts/${user.userId}`, { description });
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
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
          required
          onChange={handleChange}
        />
        <button className="btn" onClick={() => sendPost(description)}>
          Crear Post
        </button>
      </div>
      <Link className="btn" to="/profile">
        Perfil
      </Link>
    </div>
  );
};

export default HomePage;
