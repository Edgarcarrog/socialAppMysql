import { useState } from "react";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { setCookie, removeCookie } from "../helpers/cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [dataForm, setDataForm] = useState({
    mail: "",
    password: "",
  });

  const navigate = useNavigate();

  const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.post("/users/auth", dataForm);
      removeCookie("user");
      setCookie("user", response.data.data);
      toast.success(response.data.message, toastSettings);
      localStorage.setItem("store", "Sesión iniciada");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.message, toastSettings);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <div>
          <ToastContainer limit={1} />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="mail"
              placeholder="correo"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="contraseña"
              required
              onChange={handleChange}
            />
            <input className="btn" type="submit" value="Iniciar Sesión" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
