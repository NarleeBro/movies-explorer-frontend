import React from "react";

import "./AboutProject.css";
import SectionHeader from "../../Header/SectionHeader/SectionHeader";

function AboutProject() {
  return (
    <section id="AboutProject" className="about-project">
      <SectionHeader headerTitle={"О проекте"} />
      <ul className="about-project__container">
        <li className="about-project__element">
          <h2 className="about-project__text">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки
          </p>
        </li>
        <li className="about-project__element">
          <h2 className="about-project__text">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься
          </p>
        </li>
      </ul>
      <div className="about-project__timeline-container">
        <div className="about-project__week-container">
          <p className="about-project__timeline-bar about-project__timeline-bar_green">
            1 неделя
          </p>
          <p className="about-project__caption">Backend</p>
        </div>
        <div className="about-project__week-container">
          <p className="about-project__timeline-bar about-project__timeline-bar_grey">
            4 недели
          </p>
          <p className="about-project__caption">Frontend</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
