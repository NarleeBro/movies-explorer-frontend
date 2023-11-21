import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {

  const navigate = useNavigate();

  function handleGoBackOnePos() {
    navigate(-1);
  }

  return (
    <div className="page__container">
      <main className="content content_not-found">
        <section className="not-found">
          <h1 className="not-found__header">404</h1>
          <p className="not-found__subtitle">Страница не найдена</p>
          <button className="not-found__back-link link">
            <span onClick={handleGoBackOnePos}>Назад</span>
          </button>
        </section>
      </main>
    </div>
  );
}

export default NotFound;
