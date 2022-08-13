import { Navigate } from "react-router-dom";
import validateCookie from "../helpers/validateCookie";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const NotLoggedRoute = ({ children }) => {
  const [cookie, setCookie] = useState(null);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      const response = await validateCookie();
      await setCookie(response.payload);
      console.log("Response:", response);
      setFlag(false);
      console.log("Cookie de Ruta Privada", cookie);
    };
    validateUser();
  }, []);

  return flag ? <Spinner /> : cookie ? <Navigate to="/profile" /> : children;
};

export default NotLoggedRoute;
