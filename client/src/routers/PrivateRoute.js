import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import NavBar from "../components/NavBar";
import validateUser from "../helpers/validateUser";
import { context } from "../context/context";
import clienteAxios from "../config/axios";
import authToken from "../helpers/authToken";

const PrivateRoute = () => {
  const { addUser } = useContext(context);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    try {
      authToken();
      const userRecieved = await validateUser();
      const token = localStorage.getItem("user");
      const response = await clienteAxios.get(`/users/${token}`);
      console.log("response: ", response.data.data);
      addUser(response.data.data);
      await setUser(userRecieved);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("El error es: ", error.message);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return loading ? (
    <>
      <Spinner />
    </>
  ) : user ? (
    <>
      <NavBar /> <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
