import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";

const Following = () => {
  const { otherUsers } = useContext(context);
  
  return (
    <section>
      <div className="title-container">
        <h3>Siguiendo</h3>
      </div>
      <div className="card-container">
        {otherUsers &&
          otherUsers.slice(0, 4).map((user) => (
            <div>
              <Card key={user.userId}>{user}</Card>
            </div>
          ))}
      </div>
      <div className="button-container">
        <button>Ver más</button>
      </div>
    </section>
  );
};

export default Following;
