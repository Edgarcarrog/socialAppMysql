import React, { useContext } from "react";
import { context } from "../context/context";

const UserMain = () => {
  const { user } = useContext(context);
  return (
    <main className="main">
      {<h3>{user && user.avatar}</h3>}
      {<h2 className="main__title">Hola {user && user.name}</h2>}
    </main>
  );
};

export default UserMain;
