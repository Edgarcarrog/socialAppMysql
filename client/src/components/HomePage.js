import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import { getCookie } from "../helpers/cookie";
import ModalPost from "./ModalPost";

const HomePage = () => {
  const { addUser, setAllUsers, setFollowers, setFollowing } =
    useContext(context);

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

  useEffect(() => {
    try {
      setUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <button className="btn">Crear Post</button>
      <ModalPost isOpen={true}/>
      <Link className="btn" to="/profile">
        Perfil
      </Link>
    </div>
  );
};

export default HomePage;
