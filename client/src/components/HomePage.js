import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {" "}
      <h1>Home</h1>
      <nav>
        <Link className="btn" to="/login">
          Inicia Sesión
        </Link>
        <Link className="btn" to="/signup">
          Regístrate
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
