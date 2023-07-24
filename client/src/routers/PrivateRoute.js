import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import Header from "../components/Header/Header";
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
    <div className="layout">
      <Header /> <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
