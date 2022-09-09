import React, { useContext, useEffect } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following/following.css";
import ModalFollow from "./ModalFollow";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";

const FollowingPage = () => {
  const { following, modal, setFollowing } = useContext(context);

  useEffect(() => {
    try {
      setFollowings();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFollowings = async () => {
    const user = getCookie("user");
    const following = await clienteAxios.get(`/following/${user}`);
    setFollowing(following.data.data);
  };

  return (
    <section className="container following">
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
            .map((followUser) => (
              <Card
                key={followUser.Id}
                followId={followUser.Id}
                following={true}
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

export default FollowingPage;
