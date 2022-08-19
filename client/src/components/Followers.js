import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";

const Followers = () => {
  const { allUsers } = useContext(context);

  return (
    <section>
      <div className="title-container">
        <h3>Seguidores</h3>
      </div>
      <div className="card-container">
        {allUsers &&
          allUsers.map((user) => (
            <Card key={user.userId} following={false}>
              {user}
            </Card>
          ))}
      </div>
      <div className="button-container">
        <button>Ver más</button>
      </div>
    </section>
  );
};

export default Followers;
