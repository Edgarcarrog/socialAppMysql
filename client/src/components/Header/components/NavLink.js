import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ children, label, route }) => {
  return (
    <Link className="nav-menu__item" to={route}>
      <div className="nav-menu__link">
        <div className="nav-menu__icon">{children}</div>
        <div className="nav-menu__text">
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
};

export default NavLink;
