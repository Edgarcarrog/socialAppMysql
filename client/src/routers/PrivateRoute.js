import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let storage = localStorage.getItem("store");
  return storage ? children : <Navigate to="/" />;
};

export default PrivateRoute;
