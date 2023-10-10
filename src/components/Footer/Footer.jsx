import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {

  return (
    <footer className="footer">
      <p className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm
      </p>
      <div className="footer__container">
        <p className="footer__text">&#169; 2023</p>
        <ul className="footer__links">
          <li>
            <Link
              to={"https://yandex.ru/"}
              className="footer__link footer__text link"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li>
            <Link
              to={"https://github.com"}
              className="footer__link footer__text link"
              target="_blank"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
