import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderMain from "./HeaderMain/HeaderMain";
import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ onClickMenuButton }) {
  const location = useLocation();
  const [headerColor, setHeaderColor] = useState(
    location.pathname === "/" ? "landing" : "main"
  );
  const [headerAuth, setHeaderAuth] = useState("");
  const [headerDisplay, setHeaderDisplay] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  const {currentUser} = useContext(CurrentUserContext);

  useEffect(() => {
    setHeaderColor(location.pathname === "/" ? "landing" : "main");
  }, [location.pathname]);

  useEffect(() => {
    setHeaderAuth(
      location.pathname === "/signup" || location.pathname === "/signin"
        ? "header_auth"
        : ""
    );
  }, [location.pathname]);

  useEffect(() => {
    setHeaderDisplay(
      location.pathname === "/404" ? "header-container__display_none" : ""
    );
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  const handleOpenMenu = () => {
    onClickMenuButton();
  };

  return (
    <header
      className={`header-container header-container_color-${headerColor} ${headerDisplay}`}
    >
      <div className={`header ${headerAuth}`}>
        <Link to={"/"} className="header__logo link" />
        {location.pathname === "/" ? (
        currentUser.email.length === 0 ? (
          <div className="header__auth">
              <Link
                to="/signup"
                className="button-style header__signup-btn link"
              >
                Регистрация
              </Link>
              <Link
                to="/signin"
                className="button-style header__signin-btn link"
              >
                Войти
              </Link>
          </div>
        ) : (
          <HeaderMain/>
        )
        ) : location.pathname === "/signin" ? (
          <h1 className="header__welcome-container">Рады видеть!</h1>
        ) : location.pathname === "/signup" ? (
          <h1 className="header__welcome-container">Добро пожаловать!</h1>
        ) : (
          <>
            {width < 769 ? (
              <button
                type="button"
                className="header__menu-button button-style link"
                onClick={handleOpenMenu}
              ></button>
            ) : (
              <HeaderMain />
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
