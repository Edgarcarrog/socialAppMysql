import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { context } from "../context/context";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiBell, BiMessageDetail, BiLogOut } from "react-icons/bi";

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
          <Link
            className="nav-menu__item"
            name="home"
            onMouseOver={(e) => (e.target.children[0].className += " bkground")}
            onMouseLeave={(e) =>
              (e.target.children[0].className = " nav-menu__link nav-link")
            }
            to="/home"
          >
            <div
              className="nav-menu__link nav-link"
              //onClick={showMenu}
            >
              <div>
                <AiOutlineHome />
              </div>
              <div>
                <span>Inicio</span>
              </div>
            </div>
          </Link>
          <Link
            className="nav-menu__link nav-link"
            //onClick={showMenu}
            to="/notifications"
          >
            <BiBell />
            <span>Notificaciones</span>
          </Link>
          <Link
            className="nav-menu__link nav-link"
            onClick={showMenu}
            to="/profile"
          >
            <AiOutlineUser />
            <span>Profile</span>
          </Link>
          <Link
            className="nav-menu__link nav-link"
            onClick={showMenu}
            to="/messages"
          >
            <BiMessageDetail />
            <span>Mensajes</span>
          </Link>
          <Link
            className="nav-menu__link nav-link"
            //onClick={showMenu}
            to="/users"
          >
            <span>Usuarios</span>
          </Link>
          <button className="nav-menu__link nav-link" onClick={handleLogout}>
            <BiLogOut />
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
