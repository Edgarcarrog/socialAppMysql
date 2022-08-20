import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";

const Followers = () => {
  const { followers } = useContext(context);

  return (
    <section>
      <div className="title-container">
        <h3>Seguidores</h3>
        <p>Te siguen {followers && followers.length} personas</p>
      </div>
      <div className="card-container">
        {followers &&
          followers
            .sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
            .slice(0, 6)
            .map((user) => (
              <Card key={user.userId} following={false}>
                {user}
              </Card>
            ))}
      </div>
      <div className="button-container">
        <button>Ver todos</button>
      </div>
    </section>
  );
};

export default Followers;
