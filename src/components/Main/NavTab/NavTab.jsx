import React from "react";

import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li>
          <a href="#AboutProject" className="navtab__element link">
            О проекте
          </a>
        </li>
        <li>
          <a href="#Techs" className="navtab__element link">
            Технологи
          </a>
        </li>
        <li>
          <a href="#AboutMe" className="navtab__element link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
