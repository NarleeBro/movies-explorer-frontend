import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import "./MoviesCard.css";
import { MovieContext } from "../../../contexts/MovieContext";

function MoviesCard({ title, duration, backdrop, isSaved }) {
  const [favourites, setFavourites] = useState(isSaved);
  const { addMovie, deleteMovie } = useContext(MovieContext);
  const location = useLocation();
  const [isFavoritesRoute, setIsFavoritesRoute] = useState(
    location.pathname === "/saved-movies"
  );

  function handleClick(event) {
    event.preventDefault();
    if (favourites) {
      deleteMovie(title);
    } else {
      addMovie({ title, duration, backdrop });
    }
    setFavourites(!favourites);
  }

  function handleDeleteMovie() {
    deleteMovie(title);
  }

  useEffect(() => {
    setIsFavoritesRoute(location.pathname === "/saved-movies");
  }, [location.pathname]);

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursString = hours > 0 ? `${hours}ч` : "";
    const minutesString = minutes > 0 ? `${minutes}м` : "";

    return `${hoursString} ${minutesString}`.trim();
  }

  return (
    <li className="movies-card">
      <Link
        className="movies-card__link"
        to={"https://www.youtube.com/watch?v=6UgY1aEhY2c"}
        target="_blank"
      ></Link>
      <img
        className="movies-card__backdrop"
        src={backdrop}
        alt={`Кадр из фильма: ${title}`}
      />
      <div className="movies-card__container">
        <div className="movies-card__wrapper">
          <h2 className="movies-card__title">{title}</h2>

          {!isFavoritesRoute && (
            <button
              className={`movies-card__favorites-btn link ${favourites ? "active" : ""
                }`}
              type="button"
              onClick={handleClick}
            ></button>
          )}
          {isFavoritesRoute && (
            <button
              className={`movies-card__favorites-btn link remove-btn`}
              type="button"
              onClick={handleDeleteMovie}
            ></button>
          )}
        </div>
      </div>
      <span className="movies-card__duration">
        {formatDuration(duration)}
      </span>
    </li>
  );
}

export default MoviesCard;
