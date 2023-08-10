import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import Header from "../components/Header/Header";
import validateUser from "../helpers/validateUser";
import { context } from "../context/context";
import clienteAxios from "../config/axios";
import authToken from "../helpers/authToken";
import Modal from "../components/Modal/Modal";

const PrivateRoute = () => {
  const { addUser, isShowingModal, showModal } = useContext(context);
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
    <>
      {isShowingModal && (
        <Modal>
          <h2>Contenido del Modal</h2>
          <p>
            Este es el contenido del modal. Haz clic fuera de él para cerrarlo.
          </p>
        </Modal>
      )}

      <div className="layout">
        <Header /> <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
