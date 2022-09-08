import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import "../styles/user-main.css";
import Post from "./Post";

const UserMain = () => {
  const { user, myposts, setMyPosts } = useContext(context);

  console.log(user);

  const setPosts = async () => {
    let myPosts;
    if (user) myPosts = await clienteAxios.get(`/myposts/${user.userId}`);

    console.log(myPosts);
    // setPosts(myPosts.data.data);
  };

  useEffect(() => {
    try {
      setPosts();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main className="main">
      {<h3>{user && user.avatar}</h3>}
      {<h2 className="main__title">{user && user.name}</h2>}
      <Link className="btn-primary" to="/edit-profile">
        Editar perfil
      </Link>
      {myposts && myposts.map((post) => <Post key={post.Id} post={post} />)}
    </main>
  );
};

export default UserMain;
