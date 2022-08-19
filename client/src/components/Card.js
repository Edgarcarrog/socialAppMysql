import React, { useContext, useState } from "react";
import clienteAxios from "../config/axios";
import { context } from "../context/context";
import "../styles/card.css";
import profile from "../assets/profile.png";

const Card = ({ children, following }) => {
  const { user } = useContext(context);
  const [followingBtn, setFollowingBtn] = useState(following);

  const followUser = async () => {
    try {
      if (!followingBtn) {
        console.log("pasó por seguir!!!!");
        setFollowingBtn(!followingBtn)
        const response = await clienteAxios.get(
          `/follows?followerId=${user.userId}&followingId=${children.userId}`
        );
        //console.log(response);
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
        <p>{children && children.name}</p>
      </div>
      <div className="card-buttons">
        <button onClick={followUser}>
          {followingBtn ? "Siguiendo" : "Seguir"}
        </button>
      </div>
    </div>
  );
};

export default Card;
