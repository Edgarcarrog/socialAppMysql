import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";

const ProfilePage = () => {
  const { addUser, getOtherUsers, user } = useContext(context);

  const sendCookie = async () => {
    const user = getCookie("user");
    //console.log(user);
    const response = await clienteAxios.get(`/users/${user}`);
    //console.log(response);
    addUser(response.data.data);
    getOtherUsers(response.data.data)
  };

  useEffect(() => {
    try {
      sendCookie();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return <div>{<h2>Hola {user && user.name}</h2>}</div>;
};

export default ProfilePage;
