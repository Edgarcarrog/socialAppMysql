import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
// import "../styles/footer/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer__socials">
        <a
          href="https://www.linkedin.com/in/edgar-carro/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://www.github.com/Edgarcarrog"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub />
        </a>
      </div>
      <div className="footer__copy">
        <small>&copy; 2022 Edgar Carro G. </small>
      </div>
    </footer>
  );
};

export default Footer;
