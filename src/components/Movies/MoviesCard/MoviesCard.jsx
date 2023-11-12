import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import error404 from "../../../images/404.png";
import "./MoviesCard.css";
import { MovieContext } from "../../../contexts/MovieContext";

function MoviesCard({ movieId, title, duration, backdrop, trailerLink }) {
  const [favourites, setFavourites] = useState(false);
  const { addSavedMovie, delSavedMovie, savedMovies, movies } = useContext(MovieContext);
  const location = useLocation();
  const [isFavoritesRoute, setIsFavoritesRoute] = useState(
    location.pathname === "/saved-movies"
  );

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if (!isFavoritesRoute) {
      if (savedMovies) {
        const isFavorite = savedMovies.some(movie => movie.movieId === movieId);
        setFavourites(isFavorite);
      }
    }
  }, [savedMovies, movies, isFavoritesRoute, movieId]);

  function handleClick(event) {
    event.preventDefault();
    if (favourites) {
      delSavedMovie(movieId);
    } else {
      addSavedMovie(movieId);
    }
    setFavourites(!favourites);
  }

  function handleDelMovie(event) {
    event.preventDefault();
    delSavedMovie(movieId);
    setFavourites(false);
  }

  useEffect(() => {
    setIsFavoritesRoute(location.pathname === "/saved-movies");
  }, [location.pathname]);

  function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`)
  }

  return (
    <li className="movies-card">
      <Link
        className="movies-card__link"
        to={trailerLink}
        target="_blank"
      ></Link>
      {imageError ? (
        <img
          className="movies-card__backdrop"
          src={error404}
          alt="not found"
        />
      ) : (
        <img
          className="movies-card__backdrop"
          src={backdrop}
          alt={`Кадр из фильма: ${title}`}
          onError={handleImageError}
        />
      )}
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
              onClick={handleDelMovie}
            ></button>
          )}
        </div>
      </div>
      <span className="movies-card__duration">
        {convertTime(duration)}
      </span>
    </li>
  );
}

export default MoviesCard;
