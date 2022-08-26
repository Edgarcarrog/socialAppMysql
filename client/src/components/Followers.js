import React, { useContext } from "react";
import { context } from "../context/context";
import Card from "./Card";
import "../styles/following.css";

const Followers = () => {
  const { followers, following } = useContext(context);

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
    </section>
  );
};

export default Followers;
