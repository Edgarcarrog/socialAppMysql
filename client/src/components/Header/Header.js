import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { context } from "../../context/context";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiBell, BiMessageDetail, BiLogOut } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import NavLink from "./components/NavLink";

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
      <nav className="t-dark">
        <div className={`nav-menu ${menu ? "nav-menu_visible" : ""}`}>
          <NavLink label="Inicio" route="/home">
            <AiOutlineHome />
          </NavLink>
          <NavLink label="Notificaciones" route="/notifications">
            <BiBell />
          </NavLink>
          <NavLink label="Mensajes" route="/messages">
            <BiMessageDetail />
          </NavLink>
          <NavLink label="Usuarios" route="/users">
            <HiOutlineUsers />
          </NavLink>
          <NavLink label="Perfil" route="/profile">
            <AiOutlineUser />
          </NavLink>
          <button className="nav-menu__item" onClick={handleLogout}>
            <div className="nav-menu__link">
              <div className="nav-menu__icon">
                <BiLogOut />
              </div>
              <div className="nav-menu__text">
                <span>Cerrar Sesión</span>
              </div>
            </div>
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
