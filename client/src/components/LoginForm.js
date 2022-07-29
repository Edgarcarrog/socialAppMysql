import { useState } from "react";
import clienteAxios from "../config/axios";

const LoginForm = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    avatar: "",
    mail: "",
    birthday: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    try {
      await clienteAxios.post("/user", dataForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>SocialApp</h1>
      <div style={{ backgroundColor: "#000", color: "#fff" }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="nombre"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="avatar"
            placeholder="avatar"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="mail"
            placeholder="correo"
            required
            onChange={handleChange}
          />
          <input type="date" name="birthday" required onChange={handleChange} />
          <input
            type="password"
            name="password"
            placeholder="contraseña"
            required
            onChange={handleChange}
          />
          <input type="submit" value="Iniciar Sesión" />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
