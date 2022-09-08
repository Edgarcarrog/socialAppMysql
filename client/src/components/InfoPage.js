import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";
import Post from "./Post";
import { Link } from "react-router-dom";

const InfoPage = () => {
  const { user, myposts, addUser, setMyPosts } = useContext(context);

  const setPosts = async () => {
    const user = getCookie("user");
    const logedUser = await clienteAxios.get(`/users/${user}`);
    addUser(logedUser.data.data);
    const myPosts = await clienteAxios.get(
      `/myposts/${logedUser.data.data.userId}`
    );
    setMyPosts(myPosts.data.data);
  };

  useEffect(() => {
    try {
      setPosts();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container">
      {<h2 className="main__title">{user && user.name}</h2>}
      <Link className="btn-primary" to="/edit-profile">
        Editar perfil
      </Link>
      {myposts &&
        myposts.map((post) => (
          <div key={post.Id}>
            <Post post={post} />
            <button className="btn">Eliminar</button>
          </div>
        ))}
    </main>
  );
};

export default InfoPage;
