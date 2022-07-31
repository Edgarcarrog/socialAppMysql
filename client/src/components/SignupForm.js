import { useState } from "react";
import clienteAxios from "../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
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
      const data = await clienteAxios.post("/users", dataForm);
      console.log(data.data.message);
      toast.success(data.data.message, toastSettings);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, toastSettings);
    }
  };

  return (
    <>
      <h1>SocialApp</h1>
      <div>
        <ToastContainer limit={1}/>
      </div>
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
          <input type="submit" value="Registrarse" />
        </form>
      </div>
    </>
  );
};

export default SignupForm;
