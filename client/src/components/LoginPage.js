import { useState, useContext } from "react";
import clienteAxios from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { setCookie, removeCookie } from "../helpers/cookie";
import socialMedia from "../assets/social-media.png";

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
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <main>
      <article className="container">
        <div className="image-container">
          <img src={socialMedia} alt="social media" />
        </div>
        <div className="info">
          <div className="login-container">
            <h1 className="title">Social App</h1>
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
                <input className="btn" type="submit" value="Iniciar Sesión" />
              </form>
            </div>
            <div className="link">
              <Link to="/signup">¿Olvidaste tu contraseña?</Link>
            </div>
          </div>
          <div className="signup-container">
            <p>¿No tienes cuenta?</p>
            <Link to="/signup" className="btn">
              Regístrate
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default LoginPage;
