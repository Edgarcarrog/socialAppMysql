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
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
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
        addUser,
        logout,
        setAllUsers,
        setFollowing,
        setFollowers,
        showModal,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
