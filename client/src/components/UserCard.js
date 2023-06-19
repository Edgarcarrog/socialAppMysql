import React, { useContext, useState } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import profile from "../assets/profile.png";
import authToken from "../helpers/authToken";

const UserCard = ({ otherUser, following }) => {
  const { user, showModal } = useContext(context);
  const [followingBtn, setFollowingBtn] = useState(following);

  const followUserFcn = async () => {
    try {
      //   if (!followingBtn) {
      setFollowingBtn(!followingBtn);
      authToken();
      await clienteAxios.get(
        `/follows?user=${user}&followingId=${otherUser.userId}`
      );
      /* } else {
        showModal({ followUser, setFollowingBtn });
      } */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={profile} alt="foto-perfil" />
      </div>
      <div className="card-info">
        <p>{otherUser.name}</p>
      </div>
      <div className="card-buttons">
        <button onClick={followUserFcn}>Seguir</button>
      </div>
    </div>
  );
};

export default UserCard;
