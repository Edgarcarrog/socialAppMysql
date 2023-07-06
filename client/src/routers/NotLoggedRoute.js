import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import validateUser from "../helpers/validateUser";

const NotLoggedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    const user = await validateUser();
    console.log("El usuario es: ", user);
    await setUser(user);
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
      <Navigate to="/home" />
    </>
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default NotLoggedRoute;
