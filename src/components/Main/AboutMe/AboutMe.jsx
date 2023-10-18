import React from "react";
import { Link } from "react-router-dom";
import imageOwner from "../../../images/2vitalik.jpg";
import "./AboutMe.css";
import SectionHeader from "../../Header/SectionHeader/SectionHeader";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <div id="AboutMe" className="about-me">
      <SectionHeader headerTitle={"Студент"} />
      <div className="about-me__wrapper">
        <img
          src={imageOwner}
          className="about-me__image-owner"
          alt="Мой портрерт."
        />
        <div className="about-me__info">
          <h2 className="about-me__name">Виталий</h2>
          <p className="about-me__job-and-age">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            to={"https://github.com"}
            className="about-me__github-link link"
            target="_blank"
                     >
            Github
          </Link>
        </div>
      </div>
      <Portfolio />
    </div>
  );
}

export default AboutMe;
