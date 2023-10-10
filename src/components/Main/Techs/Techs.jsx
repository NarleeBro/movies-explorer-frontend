import React from "react";

import "./Techs.css";
import SectionHeader from "../../Header/SectionHeader/SectionHeader";

function Techs() {
  return (
    <section id="Techs" className="techs">
      <SectionHeader headerTitle={"Технологии"} />
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте
      </p>
      <ul className="techs__elements-wrapper">
        <li className="techs__element">CSS</li>
        <li className="techs__element">JS</li>
        <li className="techs__element">REACT</li>
        <li className="techs__element">GIT</li>
        <li className="techs__element">HTML</li>
        <li className="techs__element">Express.js</li>
        <li className="techs__element">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
