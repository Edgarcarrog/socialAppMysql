import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import NavBar from "../components/NavBar";
import validateUser from "../helpers/validateUser";

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    const user = await validateUser();
    await setUser(user);
    console.log("El usuario es (PrivateRoute): ", user);
    setLoading(false);
  };

  useEffect(() => {
    try {
      verifyUser();
    } catch (error) {
      console.log(error.message);
    }
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
