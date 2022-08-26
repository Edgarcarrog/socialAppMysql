import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../context/context";
import "../styles/user-main.css";

const UserMain = () => {
  const { user } = useContext(context);
  return (
    <main className="main">
      {<h3>{user && user.avatar}</h3>}
      {<h2 className="main__title">Hola {user && user.name}</h2>}
      <Link className="btn-primary" to="/edit-profile">
        Editar perfil
      </Link>
    </main>
  );
};

export default UserMain;
