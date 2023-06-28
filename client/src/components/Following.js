import React from "react";
import UserCard from "./UserCard";

const Following = ({ following }) => {
  return (
    <div>
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
  );
};

export default Following;
