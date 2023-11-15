import React, { useState, useEffect, useContext } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { VisibleRowsContext } from "../../../contexts/VisibleRowsContext";
import { useLocation } from "react-router-dom";

function MoviesCardList({ movies, isActive, loadMoreButtomMove }) {
  const {
    addRows,
    cardCount,
    setCardCount,
    movieCardStartColumns,
  } = useContext(VisibleRowsContext);


  const [visibleCards, setVisibleCards] = useState([]);

  const {pathname} = useLocation()

  const calculateColumns = () => {
    const { columns, rows } = movieCardStartColumns();
    const requiredCardCount = columns * rows;
    setCardCount(requiredCardCount);
  };

   useEffect(() => {

      calculateColumns();
      window.addEventListener("resize", calculateColumns);
      return () => {
        window.removeEventListener("resize", calculateColumns);
      };

  }, [window.innerWidth]);


  const loadMoreCards = () => {
    const {columns} = movieCardStartColumns();
    const size = window.innerWidth >= 1200 || window.innerWidth >= 584 // Проверка значения экрана bool
    setCardCount((prevCount) => size ? prevCount + columns : prevCount + columns * 2);
    addRows();
  };
  
  useEffect(() => {
    setVisibleCards(!loadMoreButtomMove ? movies : movies.slice(0, cardCount));
  }, [cardCount, loadMoreButtomMove, movies]);


  return (
    <section
      className={`movies-card-list ${cardCount < movies.length ? "" : "movies-card-list_padding"
        } ${isActive ? "disabled" : ""}`} //js movies.length поменять на cards попробуй два места (смотри ниже)
    >
      <ul className="movies-card-list__container">
        {visibleCards.length > 0 &&
          visibleCards.map((movie, index) => (
            <MoviesCard
              key={movie.movieId}
              movieId={movie.movieId}
              title={movie.title}
              duration={movie.duration}
              backdrop={movie.backdrop}
              trailerLink={movie.trailerLink}
            />
          ))}
      </ul>
      {cardCount < movies.length && (
        <>
          {pathname === '/saved-movies' ? null : (
            <button
              type="button"
              className="movies-card-list__button link"
              onClick={loadMoreCards}
            >
            Ещё
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
