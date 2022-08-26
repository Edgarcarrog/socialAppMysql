import { useContext } from "react";
import { context } from "../context/context";
import "../styles/edit.css";

const EditPage = () => {
  const { user } = useContext(context);
  return (
    <section className="edit__container">
      <form className="login-form" /* onSubmit={handleSubmit} */>
        <input
          type="text"
          name="name"
          value={user.name}
          required
          //   onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          //   onChange={handleChange}
        />
        <input className="btn" type="submit" value="Guardar Cambios" />
      </form>
    </section>
  );
};

export default EditPage;
