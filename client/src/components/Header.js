import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { context } from "../context/context";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiBell, BiMessageDetail, BiLogOut } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";

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
          <Link className="nav-menu__item" to="/home">
            <div className="nav-menu__link nav-link">
              <div className="nav-menu__icon">
                <AiOutlineHome />
              </div>
              <div className="nav-menu__text">
                <span>Inicio</span>
              </div>
            </div>
          </Link>
          <Link className="nav-menu__item" to="/notifications">
            <div className="nav-menu__link nav-link">
              <div className="nav-menu__icon">
                <BiBell />
              </div>
              <div className="nav-menu__text">
                <span>Notificaciones</span>
              </div>
            </div>
          </Link>
          <Link className="nav-menu__item" to="/messages">
            <div className="nav-menu__link nav-link">
              <div className="nav-menu__icon">
                <BiMessageDetail />
              </div>
              <div className="nav-menu__text">
                <span>Mensajes</span>
              </div>
            </div>
          </Link>
          <Link className="nav-menu__item" to="/users">
            <div className="nav-menu__link nav-link">
              <div className="nav-menu__icon">
                <HiOutlineUsers />
              </div>
              <div className="nav-menu__text">
                <span>Usuarios</span>
              </div>
            </div>
          </Link>
          <Link className="nav-menu__item" to="/profile">
            <div className="nav-menu__link nav-link">
              <div className="nav-menu__icon">
                <AiOutlineUser />
              </div>
              <div className="nav-menu__text">
                <span>Perfil</span>
              </div>
            </div>
          </Link>
          <button className="nav-menu__item" onClick={handleLogout}>
            <div className="nav-menu__link nav-link">
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
