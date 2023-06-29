import { useState } from "react";
import clienteAxios from "../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../styles/signup/signup.css";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const aliasNoValido = /\s/;

  const [dataForm, setDataForm] = useState({
    name: "",
    mail: "",
    birthday: "",
    password: "",
  });

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
    if (e.target.name === "alias" && aliasNoValido.test(e.target.value)) {
      console.log("El alias no puede contener espacios");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataForm.password.trim().length < 8) {
      toast.error(
        "La contraseña debe contener mínimo 8 caracteres",
        toastSettings
      );
      return;
    }

    try {
      const data = await clienteAxios.post("/users", dataForm);
      toast.success(data.data.message, toastSettings);
      e.target.reset();
    } catch (error) {
      toast.error(error.response.data.message, toastSettings);
    }
  };

  return (
    <>
      <div className="container signup">
        <h2 className="subtitle">Regístrate para crear una cuenta</h2>
        <div>
          <ToastContainer limit={1} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="mail"
            placeholder="correo"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="nombre"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="alias"
            placeholder="alias único"
            required
            onChange={handleChange}
          />
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="birthday"
            min="1918-01-01"
            max="2018-12-31"
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
          <span>Mínimo 8 caracteres</span>
          <input type="submit" value="Registrarse" />
        </form>
        <div className="signin-container">
          <p>¿Ya tienes cuenta?</p>
          <Link to="/" className="btn btn-variant">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
