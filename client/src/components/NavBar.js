import React, { useState, useContext } from "react";
import { removeCookie } from "../helpers/cookie";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { context } from "../context/context";

const NavBar = () => {
  const { logout } = useContext(context);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    /* e.preventDefault(); */
    removeCookie("user");
    logout();
    navigate("/");
  };

  const showMenu = (e) => {
    /* e.preventDefault(); */
    setMenu(!menu);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link className="logo nav-link" to="/profile">
          Logo
        </Link>
        <button
          className="nav-toggle"
          onClick={showMenu}
          aria-label="mostrar menú"
        >
          <GiHamburgerMenu />
        </button>

        <ul className={`nav-menu ${menu ? "nav-menu_visible" : "null"}`}>
          <li className="nav-menu__item">
            <Link className="nav-menu__link nav-link" to="/following">
              Siguiendo
            </Link>
          </li>
          <li className="nav-menu__item">
            <Link className="nav-menu__link nav-link" to="/followers">
              Seguidores
            </Link>
          </li>
          <li className="nav-menu__item">
            <Link className="nav-menu__link nav-link" to="/posts">
              Posts
            </Link>
          </li>
          <li className="nav-menu__item">
            <button className="nav-menu__link nav-link" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
