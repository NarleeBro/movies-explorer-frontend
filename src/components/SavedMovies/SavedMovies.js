import React, { useContext } from "react";

import { MovieContext } from "../../contexts/MovieContext";
import "./SavedMovies.css";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({ onRowsCounter, rows, onMenuButtonClick }) {
  const { savedMovies, deleteMovie } = useContext(MovieContext);

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="saved-movies">
          <SearchForm />
          <MoviesCardList
            cards={savedMovies}
            rows={rows}
            onRowsCounter={onRowsCounter}
            onRemoveFromSaved={deleteMovie}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
