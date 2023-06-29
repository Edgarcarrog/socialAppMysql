import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { context } from "../context/context";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
//import { removeCookie } from "../helpers/cookie";

const Header = () => {
  const { logout } = useContext(context);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    localStorage.removeItem("user");
    navigate("/");
  };

  const showMenu = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  return (
    <header className="header">
      <nav>
        <div className={`nav-menu ${menu ? "nav-menu_visible" : ""}`}>
          <Link
            className="nav-menu__link nav-link"
            //onClick={showMenu}
            to="/home"
          >
            <div className="nav-menu__link-item">
              {" "}
              <AiOutlineHome />
              Inicio
            </div>
          </Link>
          <Link
            className="nav-menu__link nav-link"
            //onClick={showMenu}
            to="/profile"
          >
            <div className="nav-menu__link-item">
              <AiOutlineUser />
              Perfil
            </div>
          </Link>
          <Link
            className="nav-menu__link nav-link"
            onClick={showMenu}
            to="/following"
          >
            <div className="nav-menu__link-item">Siguiendo</div>
          </Link>
          <Link
            className="nav-menu__link nav-link"
            onClick={showMenu}
            to="/followers"
          >
            <div className="nav-menu__link-item">Seguidores</div>
          </Link>
          <Link
            className="nav-menu__link nav-link"
            //onClick={showMenu}
            to="/users"
          >
            <div className="nav-menu__link-item">Usuarios</div>
          </Link>
          <button className="nav-menu__link nav-link" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </nav>
      <button
        className="nav-toggle"
        onClick={showMenu}
        aria-label="mostrar menú"
      >
        <GiHamburgerMenu />
      </button>
    </header>
  );
};

export default Header;
