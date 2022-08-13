import React, { useEffect } from "react";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";
import Spinner from "./Spinner";

const ProfilePage = () => {
  const sendCookie = async () => {
    const user = getCookie("user");
    const response = await clienteAxios.get(`/users/get/profile/${user}`);
    console.log(response);
  };
  useEffect(() => {
    sendCookie();
  }, []);

  return <div>ProfilePage</div>;
};

export default ProfilePage;
