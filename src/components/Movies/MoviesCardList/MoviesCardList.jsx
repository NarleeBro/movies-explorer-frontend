import React, { useState, useEffect, useContext } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MovieContext } from "../../../contexts/MovieContext";
import { VisibleRowsContext } from "../../../contexts/VisibleRowsContext";

const movieCardStartColumns = () => {
  if (window.innerWidth >= 1280) return 3;
  if (window.innerWidth >= 700) return 2;
  return 1;
};

function MoviesCardList({ cards }) {
  const { savedMovies, addMovie, deleteMovie } = useContext(MovieContext);
  const { addRows, getRows } = useContext(VisibleRowsContext);
  const startVisibleRows = getRows();
  const [columns, setColumns] = useState(movieCardStartColumns());
  const [cardCount, setCardCount] = useState(startVisibleRows * columns);

  const calColumns = (cards) => {
    const newColumns = movieCardStartColumns();
    setColumns(newColumns);
    const requiredMovieCardCount = newColumns * startVisibleRows;
    if (cards.length < requiredMovieCardCount) {
      setCardCount(cards.length);
    } else {
      setCardCount(requiredMovieCardCount);
    }
  };

  useEffect(() => {
    calColumns({ cards });
    window.addEventListener("resize", calColumns);
    return () => {
      window.removeEventListener("resize", calColumns);
    };
  }, []);

  const loadMoreCards = () => {
    setCardCount(cardCount + columns);
    addRows();
  };

  const visibleCards = cards.slice(0, cardCount);

  return (
    <section
      className={`movies-card-list ${cardCount < cards.length ? "" : "movies-card-list_padding"
        }`}
    >
      <ul className="movies-card-list__container">
        {visibleCards.map((movie, index) => (
          <MoviesCard
            key={index}
            title={movie.title}
            duration={movie.duration}
            backdrop={movie.backdrop}
            isSaved={savedMovies.some(
              (savedMovie) => savedMovie.title === movie.title
            )}
            onAddToSaved={addMovie}
            onRemoveFromSaved={deleteMovie}
          />
        ))}
      </ul>
      {cardCount < cards.length && (
        <button
          type="button"
          className="movies-card-list__button link"
          onClick={loadMoreCards}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
