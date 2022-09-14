import React, { useContext, useEffect } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";
import ModalFollow from "./ModalFollow";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";

const AllUsers = () => {
  const { allUsers, following, modal, setAllUsers, setFollowing } =
    useContext(context);

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
    //const logedUser = await clienteAxios.get(`/allusers/${user}`);
    const [allUsers, following] = await Promise.all([
      clienteAxios.get(`/allusers/${user}`),
      clienteAxios.get(`/following/${user}`),
    ]);
    setAllUsers(allUsers.data.data);
    setFollowing(following.data.data);
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
              .map((followUser) => {
                //encuentra un registro para un seguidor que el usuario también sigue
                const follow = following.find(
                  (user) => user.userId === followUser.userId
                );
                return (
                  <Card
                    key={followUser.userId}
                    allUsers={true}
                    //id del registro en caso que el usuario deje de seguir a un seguidor
                    followId={follow ? follow.Id : null}
                    following={follow ? true : false}
                    followUser={followUser}
                  />
                );
              })}
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
