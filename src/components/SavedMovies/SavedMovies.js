import React, { useEffect, useContext } from "react";

import { MovieContext } from "../../contexts/MovieContext";
import "./SavedMovies.css";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { PreloaderContext } from "../../contexts/PreloaderContext";
import { SearchContext } from "../../contexts/SearchContext";

function SavedMovies({
  onRowsCounter,
  rows,
  onMenuButtonClick,
  errorMessage,
  setErrorMessage,
  searchFilter,
}) {
  const { savedMovies, delSavedMovie, saveSavedMovies } =
    useContext(MovieContext);
  const { searchTermSavedMovies, setSearchTermSavedMovies } =
    useContext(SearchContext);
  const { checkboxfilterModeSaved, setCheckboxfilterModeSaved } =
    useContext(SearchContext);
  const { setStatePreloader } = useContext(PreloaderContext);

  useEffect(() => {
    saveSavedMovies();
  }, []);

  function handleSearch() {
    const optionsData = {
      searchQuery: searchTermSavedMovies,
      checkboxfilterMode: checkboxfilterModeSaved,
    };

    localStorage.setItem("options-saved-movies", JSON.stringify(optionsData));

    setStatePreloader(true);

    try {
      searchFilter(checkboxfilterModeSaved, "saved-movies");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setStatePreloader(false);
    }
  }

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="saved-movies">
          <SearchForm
            onSearch={handleSearch}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setCheckboxfilterMode={setCheckboxfilterModeSaved}
            checkboxfilterMode={checkboxfilterModeSaved}
            setSearchQuery={setSearchTermSavedMovies}
            searchQuery={searchTermSavedMovies}
            localStorageName={"options-saved-movies"}
            isSaved={true}
          />
          <MoviesCardList
            movies={savedMovies} 
            rows={rows}
            onRowsCounter={onRowsCounter}
            onRemoveFromSaved={delSavedMovie}
            loadMoreButtomMove={false}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
