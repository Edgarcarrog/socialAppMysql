import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";

const Followers = () => {
  const { otherUsers } = useContext(context);

  return (
    <section>
      <div className="title-container">
        <h3>Seguidores</h3>
      </div>
      <div className="card-container">
        {otherUsers &&
          otherUsers
            .slice(0, 4)
            .map((user) => <Card key={user.userId}>{user}</Card>)}
      </div>
      <div className="button-container">
        <button>Ver más</button>
      </div>
    </section>
  );
};

export default Followers;
