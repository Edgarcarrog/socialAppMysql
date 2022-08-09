import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let storage = localStorage.getItem("store");
  console.log(storage);
  return storage ? children : <Navigate to="/" />;
};

export default PrivateRoute;
