import React, { useRef } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ children, label, route }) => {
  const link = useRef();

  const hover = () => {
    link.current.className += " bkground";
  };

  const unHover = () => {
    link.current.className = "nav-menu__link";
  };

  return (
    <Link
      className="nav-menu__item"
      onMouseEnter={hover}
      onMouseLeave={unHover}
      to={route}
    >
      <div className="nav-menu__link" ref={link}>
        <div className="nav-menu__icon">{children}</div>
        <div className="nav-menu__text">
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
};

export default NavLink;
