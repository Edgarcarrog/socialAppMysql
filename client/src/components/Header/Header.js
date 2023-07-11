import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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

  const Links = [
    { label: "Inicio", icon: <AiOutlineHome />, route: "/home" },
    { label: "Notificaciones", icon: <BiBell />, route: "/notifications" },
    { label: "Mensajes", icon: <BiMessageDetail />, route: "/messages" },
    { label: "Usuarios", icon: <HiOutlineUsers />, route: "/users" },
    { label: "Perfil", icon: <AiOutlineUser />, route: "/profile" },
  ];

  return (
    <header className="header">
      <nav className="t-dark">
        <div className={`nav-menu ${menu ? "nav-menu_visible" : ""}`}>
          {Links.map((item, index) => (
            <NavLink key={index} label={item.label} route={item.route}>
              {item.icon}
            </NavLink>
          ))}
          <div onClick={handleLogout}>
            <NavLink label="Cerrar Sesión" route="/">
              <BiLogOut />
            </NavLink>
          </div>
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
