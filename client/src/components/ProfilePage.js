import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";
import Following from "./Following";
import Followers from "./Followers";
import UserMain from "./UserMain";

const ProfilePage = () => {
  const { addUser, getOtherUsers } = useContext(context);

  const sendCookie = async () => {
    const user = getCookie("user");
    const [logedUser, otherUsers] = await Promise.all([
      clienteAxios.get(`/users/${user}`),
      clienteAxios.get(`/allusers/${user}`),
    ]);
    addUser(logedUser.data.data);
    getOtherUsers(otherUsers.data.data);
  };

  useEffect(() => {
    try {
      sendCookie();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="profile container">
      <UserMain />
      <Following />
      <Followers />
    </div>
  );
};

export default ProfilePage;
