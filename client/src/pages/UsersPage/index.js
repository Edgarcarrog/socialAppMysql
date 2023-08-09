import React, { useContext, useEffect } from "react";
import { context } from "../../context/context";
import UserCard from "../../components/UserCard";
// import "../styles/following.css";
import ModalFollow from "../../components/ModalFollow";
import clienteAxios from "../../config/axios";
import authToken from "../../helpers/authToken";

const UsersPage = () => {
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
    const token = localStorage.getItem("user");
    console.log(token);
    authToken();
    const [allUsers, following] = await Promise.all([
      clienteAxios.get(`/allusers/${token}`),
      clienteAxios.get(`/following/${token}`),
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
              .map((otherUser) => {
                //encuentra un registro para un seguidor que el usuario también sigue
                const follow = following.find(
                  (user) => user.userId === otherUser.userId
                );
                return (
                  <UserCard
                    key={otherUser.userId}
                    //id del registro en caso que el usuario deje de seguir a un seguidor
                    followId={follow ? follow.Id : null}
                    following={follow ? true : false}
                    otherUser={otherUser}
                  />
                );
              })}
        </div>

        {/* TODO 
        <div className="button-container">
              <button>Ver todos</button>
            </div> */}
        <ModalFollow modal={modal} />
      </section>
    </div>
  );
};

export default UsersPage;
