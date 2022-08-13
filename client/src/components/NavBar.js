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
    <header className="header">
      <nav className="navbar">
        <a className="logo nav-link" href="#">
          Logo
        </a>
        <ul className="nav-menu">
          <li className="nav-menu__item">
            <a className="nav-menu__link nav-link" href="#">
              Siguiendo
            </a>
          </li>
          <li className="nav-menu__item">
            <a className="nav-menu__link nav-link" href="#">
              Seguidores
            </a>
          </li>
          <li className="nav-menu__item">
            <a className="nav-menu__link nav-link" href="#">
              Posts
            </a>
          </li>
          <li className="nav-menu__item">
            <a className="nav-menu__link nav-link" href="#">
              Cerrar Sesión
            </a>
          </li>
        </ul>
        {/* <button className="btn" onClick={handleLogout}>
          Cerrar Sesión
        </button> */}
      </nav>
    </header>
  );
};

export default NavBar;
