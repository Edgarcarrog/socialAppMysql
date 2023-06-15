import { useState } from "react";
import clienteAxios from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
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
      //response contiene el Token generado al iniciar sesión
      const response = await clienteAxios.post("/users/auth", dataForm);
      localStorage.setItem("user", response.data.data); 
      navigate("/profile");
    } catch (error) {
      console.log(error.response.data.message);
      const notify = () => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      };
      notify();
    }
  };

  return (
    <div className="info">
      <ToastContainer autoClose={2000}/>
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
        {/* TODO */}
        {/* <div className="link">
          <Link to="/signup">¿Olvidaste tu contraseña?</Link>
        </div> */}
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

export default Login;
