import React, { useContext } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";
import ModalFollow from "./ModalFollow";

const AllUsers = () => {
  const { allUsers, modal } = useContext(context);

  return (
    <section className="following">
      <div className="title-container">
        <h3>Usuarios</h3>
      </div>
      <div className="card-container">
        {allUsers &&
          allUsers
            .sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
            .map((followUser) => (
              <Card
                key={followUser.userId}
                allUsers={true}
                followId={followUser.Id}
                followUser={followUser}
              />
            ))}
      </div>
      <div className="button-container">
        <button>Ver todos</button>
      </div>
      <ModalFollow modal={modal} />
    </section>
  );
};

export default AllUsers;
