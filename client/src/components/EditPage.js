import { useState } from "react";
import clienteAxios from "../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/edit/edit.css";

const EditPage = () => {
  var objUser = JSON.parse(sessionStorage.getItem("user"));

  const [user, setUser] = useState({
    name: objUser.name,
    birthday: objUser.birthday.substring(0, 10),
  });

  const [isdisabled, setIsDisabled] = useState(true);

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
    setIsDisabled(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.put(`/users/${objUser.userId}`, user);
      if (response.data.result.affectedRows === 0) {
        throw new Error("Hubo un error al actualizar");
      }
      toast.success(response.data.msg, toastSettings);
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
      toast.error(error.message, toastSettings);
    }
  };

  return (
    <section className="container edit__container">
      <div>
        <ToastContainer limit={1} />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          required
          onChange={handleChange}
        />
        <input
          type="date"
          name="birthday"
          min="1918-01-01"
          max="2018-12-31"
          value={user.birthday}
          required
          onChange={handleChange}
        />
        <input
          className="btn"
          type="submit"
          value="Guardar Cambios"
          disabled={isdisabled}
        />
      </form>
    </section>
  );
};

export default EditPage;
