import "./Menu.css";
import "../../App/App.css" //js ??? убрать может???
import "../HeaderMain/HeaderMain";
import usePopupClose from "../../../hooks/usePopupClose";
import ProfileButton from "../ProfileButton/ProfileButton";

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Menu({ isOpen, onClose }) {
  usePopupClose(isOpen, onClose);
  const location = useLocation(); //js

  const [isBurgerMenu, setIsBurgerMenu] = useState(location.pathname === "/");
  useEffect(() => {
    setIsBurgerMenu(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <menu className={`menu ${isOpen ? "open" : ""} ${isBurgerMenu ? "menu_logged-in" : ""}`} >
        {isOpen && (
          <nav className="menu__container">
            <button type="button" className="menu__close-button link" onClick={onClose} />
            <ul className="menu__content">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `menu__link link ${location.pathname === "/" && "active"}`
                }
              >
                Главная
              </NavLink>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `menu__link link ${isActive && "active"}`
                }
              >
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  `menu__link link ${isActive && "active"}`
                }
              >
                Сохранённые фильмы
              </NavLink>
            </ul>
            <div className="menu__account">
              <ProfileButton />
            </div>
          </nav>
        )}
      </menu>
    </div>
  );
}

export default Menu;
