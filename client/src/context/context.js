import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const context = createContext();

const Provider = ({ children }) => {
  const initialState = {
    user: null,
    allUsers: null,
    following: null,
    followers: null,
    hobbies: null,
    modal: null,
    myposts: null,
    posts: null,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = (user) => {
    //sessionStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  };

  const setAllUsers = (user) => {
    dispatch({
      type: "SET_ALL_USERS",
      payload: user,
    });
  };

  const setFollowing = (user) => {
    dispatch({
      type: "SET_FOLLOWING",
      payload: user,
    });
  };

  const setFollowers = (user) => {
    dispatch({
      type: "SET_FOLLOWERS",
      payload: user,
    });
  };

  const setMyPosts = (posts) => {
    dispatch({
      type: "SET_MY_POSTS",
      payload: posts,
    });
  };

  const deleteMyPost = (id) => {
    dispatch({
      type: "DELETE_MY_POST",
      payload: id,
    });
  };

  const setPosts = (posts) => {
    dispatch({
      type: "SET_POSTS",
      payload: posts,
    });
  };

  const logout = (id) => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const showModal = (data) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: data,
    });
  };

  return (
    <context.Provider
      value={{
        allUsers: state.allUsers,
        following: state.following,
        followers: state.followers,
        user: state.user,
        modal: state.modal,
        myposts: state.myposts,
        posts: state.posts,
        addUser,
        deleteMyPost,
        logout,
        setAllUsers,
        setFollowing,
        setFollowers,
        setMyPosts,
        setPosts,
        showModal,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
