import { Navigate } from "react-router-dom";
import validateCookie from "../helpers/validateCookie";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const NotLoggedRoute = ({ children }) => {
  const [cookie, setCookie] = useState(null);
  const [flag, setFlag] = useState(true);

  const validateUser = async () => {
    const response = await validateCookie();
    await setCookie(response.payload);
    //console.log("Response:", response);
    setFlag(false);
    //console.log("Cookie de Ruta Privada", cookie);
  };

  useEffect(() => {
    try {
      validateUser();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return flag ? <Spinner /> : cookie ? <Navigate to="/home" /> : children;
};

export default NotLoggedRoute;
