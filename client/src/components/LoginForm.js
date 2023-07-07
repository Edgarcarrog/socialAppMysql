import { useEffect, useRef, useState } from "react";
import clienteAxios from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [dataForm, setDataForm] = useState({
    mail: "",
    password: "",
  });

  const focusInput = useRef();

  useEffect(() => {
    focusInput.current.focus();
  }, []);

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
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
      const notify = () => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      };
      notify();
    }
  };

  return (
    <section>
      <ToastContainer autoClose={2000} />
      <div className="info">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="input"
              name="mail"
              placeholder="Correo electrónico"
              required
              ref={focusInput}
              onChange={handleChange}
            />
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Contraseña"
              required
              onChange={handleChange}
            />
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Iniciar Sesión"
            />
          </form>
          {/* TODO */}
          <div className="reset-pass">
            <Link to="/signup" className="link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <div className="signup-container">
          <p className="t-dark">¿No tienes cuenta?</p>
          <Link to="/signup" className="btn btn-secondary">
            Regístrate
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
