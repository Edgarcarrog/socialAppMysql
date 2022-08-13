import React, { useEffect } from "react";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";
import NavBar from "./NavBar";

const ProfilePage = () => {
  const sendCookie = async () => {
    const user = getCookie("user");
    const response = await clienteAxios.get(`/users/get/profile/${user}`);
    console.log(response);
  };
  useEffect(() => {
    sendCookie();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Profile Page</h1>
    </div>
  );
};

export default ProfilePage;
