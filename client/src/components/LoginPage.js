import { useState, useContext } from "react";
import { context } from "../context/context";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { setCookie, removeCookie } from "../helpers/cookie";

const LoginPage = () => {
  const [dataForm, setDataForm] = useState({
    mail: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.post("/users/auth", dataForm);
      removeCookie("user");
      setCookie("user", response.data.data);
      localStorage.setItem("store", "Sesión iniciada");
      navigate("/profile");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Login</h1>
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
