import React, { useContext, useEffect } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";
import ModalFollow from "./ModalFollow";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";

const AllUsers = () => {
  const { allUsers, modal, setAllUsers } = useContext(context);

  useEffect(() => {
    try {
      setUsers();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUsers = async () => {
    const user = getCookie("user");
    const logedUser = await clienteAxios.get(`/allusers/${user}`);
    setAllUsers(logedUser.data.data);
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default AllUsers;
