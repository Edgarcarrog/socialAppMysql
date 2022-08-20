import React, { useContext } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";
import ModalFollow from "./ModalFollow";

const Following = () => {
  const { following, modal } = useContext(context);

  return (
    <section className="following">
      <div className="title-container">
        <h3>Siguiendo</h3>
        <p>Sigues a {following && following.length} personas</p>
      </div>
      <div className="card-container">
        {following &&
          following
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
              <Card key={user.Id} following={true}>
                {user}
              </Card>
            ))}
      </div>
      <div className="button-container">
        <button>Ver todos</button>
      </div>
      <ModalFollow modal={modal} />
    </section>
  );
};

export default Following;
