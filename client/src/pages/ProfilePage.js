import React, { useContext, useEffect, useState } from "react";
import { context } from "../context/context";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import authToken from "../helpers/authToken";
import MyPosts from "../components/MyPosts";
import Following from "../components/Following";

const ProfilePage = () => {
  const {
    user,
    myposts,
    modal,
    showModal,
    setMyPosts,
    followers,
    setFollowers,
    following,
    setFollowing,
  } = useContext(context);

  const [display, setDisplay] = useState("myposts");

  useEffect(() => {
    try {
      setPosts();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPosts = async () => {
    authToken();
    const token = localStorage.getItem("user");
    const [myPosts, following, followers] = await Promise.all([
      clienteAxios.get(`/myposts/${token}`),
      clienteAxios.get(`/following/${token}`),
      clienteAxios.get(`/followers/${token}`),
    ]);
    console.log("following: ", following);
    setMyPosts(myPosts.data.data);
    setFollowing(following.data.data);
    setFollowers(followers.data.data);
  };

  return (
    <>
      {/* <ModalPost
        active={activeModal.isModalDelete}
        setActiveModal={setActiveModal}
      />
      <ModalEditPost
        active={activeModal.isModalUpdate}
        setActiveModal={setActiveModal}
      /> */}
      <main className="container profile-container">
        {<h2 className="user-title">{user && user.name}</h2>}
        <div>
          <h6>Publicaciones</h6>
        </div>
        {myposts && display === "myposts" && (
          <MyPosts data={{ myposts, user }} />
        )}
        {following && display === "following" && (
          <Following following={following} />
        )}
        {followers && display === "followers" && (
          <Following following={followers} />
        )}
      </main>
    </>
  );
};

export default ProfilePage;
