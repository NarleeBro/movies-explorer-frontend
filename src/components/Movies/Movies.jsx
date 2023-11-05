import React from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({ cards, onMenuButtonClick }) {
  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="movies">
          <SearchForm />
          <MoviesCardList cards={cards} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
