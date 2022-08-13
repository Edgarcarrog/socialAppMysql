import React from "react";
import { removeCookie } from "../helpers/cookie";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie("user");
    navigate("/");
  };
  return (
    <div>
      <nav>
        <button className="btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
