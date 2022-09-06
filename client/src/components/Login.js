import { useState } from "react";
import clienteAxios from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { setCookie, removeCookie } from "../helpers/cookie";
import "../styles/login.css";

const Login
 = () => {
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
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="info">
      <div className="login-container">
        <div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="mail"
              placeholder="Correo electrónico"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              onChange={handleChange}
            />
            <input
              className="btn btn-primary"
              type="submit"
              value="Iniciar Sesión"
            />
          </form>
        </div>
        <div className="link">
          <Link to="/signup">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
      <div className="signup-container">
        <p>¿No tienes cuenta?</p>
        <Link to="/signup" className="btn btn-variant">
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default Login
;
