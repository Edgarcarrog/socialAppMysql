import React, { useContext, useState } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import profile from "../assets/profile.png";
import authToken from "../helpers/authToken";

const UserCard = ({ followId, following, otherUser }) => {
  console.log("Card!!!!", followId, following, otherUser);
  const { user, showModal } = useContext(context);

  const [followingBtn, setFollowingBtn] = useState(following);

  const followUserFcn = async () => {
    try {
      /*Si el usuario loggeado está siguiendo a este otro usuario,
      followingBtn estará en true y no hará la llamada al backend */
      if (!followingBtn) {
        setFollowingBtn(!followingBtn);
        authToken();
        await clienteAxios.get(
          `/follows?user=${user.userId}&followingId=${otherUser.userId}`
        );
      } else {
        showModal({ otherUser, setFollowingBtn });
      }
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
        <button onClick={followUserFcn}>
          {followingBtn ? "Siguiendo" : "Seguir"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
