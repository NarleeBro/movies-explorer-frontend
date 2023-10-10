import "./HeaderMain.css";
import { NavLink } from "react-router-dom";
import { React } from "react";
import ProfileButton from "../ProfileButton/ProfileButton";

function HeaderMain() {
  return (
    <nav className="header__buttons-container">
      <div className="header__nav-links-container">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `header__nav-links button-style link ${isActive}`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `header__nav-links button-style link ${isActive}`
          }
        >
          Сохранённые фильмы
        </NavLink>
      </div>
      <ProfileButton />
    </nav>
  );
}

export default HeaderMain;
