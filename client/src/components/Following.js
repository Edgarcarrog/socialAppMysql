import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";

const Following = () => {
  const { following } = useContext(context);

  return (
    <section>
      <div className="title-container">
        <h3>Siguiendo</h3>
      </div>
      <div className="card-container">
        {following &&
          following.map((user) => (
            <Card key={user.userId} following={true}>
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

export default Following;
