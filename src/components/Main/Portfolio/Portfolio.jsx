import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link-wrapper">
          <Link
            target="_blank"
            to={"https://narleebro.github.io/how-to-learn/"}
            className="portfolio__link portfolio__subtitle link"
          >
            <p className="portfolio__subtitle">Статичный сайт</p>
          </Link>
        </li>
        <li className="portfolio__link-wrapper">
          <Link
            target="_blank"
            to={"https://narleebro.github.io/russian-travel/"}
            className="portfolio__link portfolio__subtitle link"
          >
            <p className="portfolio__subtitle">Адаптивный сайт</p>
          </Link>
        </li>
        <li className="portfolio__link-wrapper">
          <Link
            target="_blank"
            to={"https://narleebro.github.io/react-mesto-auth/"}
            className="portfolio__link portfolio__subtitle link"
          >
            <p className="portfolio__subtitle">Одностраничное приложение</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
