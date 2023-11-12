import React, { useContext, useEffect } from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import { PreloaderContext } from "../../contexts/PreloaderContext";
import { MovieContext } from "../../contexts/MovieContext";
import { SearchContext } from "../../contexts/SearchContext";
import apiMovies from "../../utils/MovieApi";

function Movies({ onMenuButtonClick, searchFilter, errorMessage, setErrorMessage }) {
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);
  const { movies, downloudsMovies } = useContext(MovieContext);
  const { searchTermMovies, setSearchTermMovies } = useContext(SearchContext);
  const { checkboxfilterMode, setCheckboxfilterMode } = useContext(SearchContext);

  useEffect(() => {
    if (downloudsMovies()) {
      handleSearch();
    }
  }, []);

  async function handleSearch() {
    const optionsData = {
      searchQuery: searchTermMovies,
      checkboxfilterMode: checkboxfilterMode,
    };

    localStorage.setItem(
      "options-beatfilm-movies",
      JSON.stringify(optionsData)
    );

    const storedMovies = JSON.parse(localStorage.getItem("beatfilm-movies"));

    setStatePreloader(true);

    if (!storedMovies) {
      apiMovies()
        .then((data) => {
          localStorage.setItem("beatfilm-movies", JSON.stringify(data));
          searchFilter(checkboxfilterMode, "beatfilm-movies");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
        .finally(() => {
          setStatePreloader(false);
        });
    } else {
      try {
        searchFilter(checkboxfilterMode, "beatfilm-movies");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setStatePreloader(false);
      }
    }
  }

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="movies">
          <SearchForm
            onSearch={handleSearch}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setCheckboxfilterMode={setCheckboxfilterMode}
            checkboxfilterMode={checkboxfilterMode}
            setSearchQuery={setSearchTermMovies}
            searchQuery={searchTermMovies}
            localStorageName={"options-beatfilm-movies"}
            isSaved={false} />
          {!isActivePreloader && <MoviesCardList
            movies={movies}
            isActive={isActivePreloader}
            loadMoreButtomMove={true}
          />}
          {isActivePreloader && <Preloader />}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
