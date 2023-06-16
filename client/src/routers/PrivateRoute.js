import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import NavBar from "../components/NavBar";
import validateUser from "../helpers/validateUser";
import { context } from "../context/context";

const PrivateRoute = () => {
  const { addUser } = useContext(context);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    const userRecieved = await validateUser();
    addUser(userRecieved)
    await setUser(userRecieved);
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
