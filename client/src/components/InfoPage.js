import React, { useEffect, useContext } from "react";
import { context } from "../context/context";
import clienteAxios from "../config/axios";
import { getCookie } from "../helpers/cookie";
import Following from "./Following";
import Followers from "./Followers";
import UserMain from "./UserMain";
import AllUsers from "./AllUsers";

const InfoPage = () => {
  const { addUser, setAllUsers, setFollowers, setFollowing } =
    useContext(context);

  const setUsers = async () => {
    const user = getCookie("user");
    const [logedUser, allUsers, following, followers] = await Promise.all([
      clienteAxios.get(`/users/${user}`),
      clienteAxios.get(`/allusers/${user}`),
      clienteAxios.get(`/following/${user}`),
      clienteAxios.get(`/followers/${user}`),
    ]);

    addUser(logedUser.data.data);
    setAllUsers(allUsers.data.data);
    setFollowing(following.data.data);
    setFollowers(followers.data.data);
  };

  useEffect(() => {
    try {
      setUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="profile container">
      <UserMain />
      {/* <Following />
      <Followers />
      <AllUsers /> */}
    </div>
  );
};

export default InfoPage;
