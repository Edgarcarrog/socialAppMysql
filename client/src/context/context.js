import { createContext, useReducer } from "react";
import clienteAxios from "../config/axios";
import reducer from "./reducer";

export const context = createContext();

const Provider = ({ children }) => {
  const initialState = {
    user: null,
    otherUsers: null,
    hobbies: null,
    following: null,
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

  const getOtherUsers = async (id) => {
    const { data } = await clienteAxios.get(`/allusers/${id}`);
    dispatch({
      type: "GET_OTHER_USERS",
      payload: data.data,
    });
  };

  const setFollowing = async (id) => {
    dispatch({
      type: "SET_FOLLOWING",
      payload: id,
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
        user: state.user,
        otherUsers: state.otherUsers,
        addUser,
        getOtherUsers,
        logout,
        setFollowing,
        setFollowers,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;