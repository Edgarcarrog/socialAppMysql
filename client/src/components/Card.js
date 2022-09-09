import React, { useContext, useState } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import profile from "../assets/profile.png";
import { getCookie } from "../helpers/cookie";

const Card = ({ followUser, following }) => {
  const { showModal } = useContext(context);
  const [followingBtn, setFollowingBtn] = useState(following);

  const followUserFcn = async () => {
    try {
      if (!followingBtn) {
        setFollowingBtn(!followingBtn);
        const user = getCookie("user");
        await clienteAxios.get(
          `/follows?user=${user}&followingId=${followUser.userId}`
        );
      } else {
        showModal({ followUser, setFollowingBtn });
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
        <p>{followUser && followUser.name}</p>
      </div>
      <div className="card-buttons">
        <button onClick={followUserFcn}>
          {followingBtn ? "Siguiendo" : "Seguir"}
        </button>
      </div>
    </div>
  );
};

export default Card;
