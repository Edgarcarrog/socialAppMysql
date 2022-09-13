import React, { useContext, useEffect } from "react";
import { context } from "../context/context";
import Card from "./Card";
import ModalFollow from "./ModalFollow";
import "../styles/following.css";
import { getCookie } from "../helpers/cookie";
import clienteAxios from "../config/axios";

const Followers = () => {
  const { followers, following, modal, setFollowers, setFollowing } =
    useContext(context);

  useEffect(() => {
    try {
      getFollowers();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFollowers = async () => {
    const user = getCookie("user");
    const following = await clienteAxios.get(`/following/${user}`);
    const followers = await clienteAxios.get(`/followers/${user}`);
    setFollowing(following.data.data);
    setFollowers(followers.data.data);
  };

  return (
    <section className="container">
      <div className="title-container">
        <h3>Seguidores</h3>
        {followers &&
          (followers.length > 1 ? (
            <p>Te siguen {followers.length} personas</p>
          ) : (
            <p>Te sigue {followers.length} persona</p>
          ))}
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
            .map((follower) => {
              //encuentra un registro para un seguidor que el usuario también sigue
              const follow = following.find(
                (data) => data.userId === follower.userId
              );
              return (
                <Card
                  key={follower.userId}
                  //id del registro en caso que el usuario deje de seguir a un seguidor
                  followId={follow ? follow.Id : null}
                  following={follow ? true : false}
                  followUser={follower}
                />
              );
            })}
      </div>
      <div className="button-container">
        <button>Ver todos</button>
      </div>
      <ModalFollow modal={modal} />
    </section>
  );
};

export default Followers;
