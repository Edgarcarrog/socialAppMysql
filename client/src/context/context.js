import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const context = createContext();

const Provider = ({ children }) => {
  const initialState = {
    user: null,
    allUsers: null,
    following: null,
    hobbies: null,
    followers: null,
  };

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = (user) => {
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

  const setFollowers = async (id) => {
    /*  dispatch({
      type: "SET-GROUP",
      payload: grupo.data,
    }); */
  };

  const logout = (id) => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <context.Provider
      value={{
        allUsers: state.allUsers,
        following: state.following,
        user: state.user,
        addUser,
        logout,
        setAllUsers,
        setFollowing,
        setFollowers,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
