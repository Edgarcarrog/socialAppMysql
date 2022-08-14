import React, { useState } from "react";
import { removeCookie } from "../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

/* class Question extends React.Component {
  render() {
    return <h3> Lets go for a <GiHamburgerMenu />? </h3>
  }
} */

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie("user");
    navigate("/");
  };

  const showMenu = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <a className="logo nav-link" href="#">
          Logo
        </a>
        <button className="nav-toggle" onClick={showMenu}>
          <GiHamburgerMenu />
        </button>

        <ul className={`nav-menu ${menu ? "nav-menu_visible" : "null"}`}>
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
            <a
              className="nav-menu__link nav-link"
              href="#"
              onClick={handleLogout}
            >
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
