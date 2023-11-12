import { createContext, useState } from "react";
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTermMovies, setSearchTermMovies] = useState("");
  const [searchTermSavedMovies, setSearchTermSavedMovies] = useState("");
  const [checkboxfilterMode, setCheckboxfilterMode] = useState(false);
  const [checkboxfilterModeSaved, setCheckboxfilterModeSaved] = useState(false);

  const resetSearchTermsContext = () => {
    setSearchTermMovies("");
    setSearchTermSavedMovies("");
    setCheckboxfilterMode(false);
    setCheckboxfilterModeSaved(false);
  };

  const setSearchTermMoviesValue = (value) => {
    setSearchTermMovies(value);
  };

  function setTerms() {
    const [term, mode] = installLocalCopy("options-beatfilm-movies");
    setSearchTermMovies(term);
    setCheckboxfilterMode(mode);
    setSearchTermSavedMovies("");
    setCheckboxfilterModeSaved(false);
  }
  
  function installLocalCopy(localStorageName) {
    const optionsLocalCopy = JSON.parse(localStorage.getItem(localStorageName));
    if (optionsLocalCopy) {
      const mode = optionsLocalCopy.checkboxfilterMode
        ? optionsLocalCopy.checkboxfilterMode
        : false;
      const term = optionsLocalCopy.searchQuery
        ? optionsLocalCopy.searchQuery
        : "";
      return [term, mode];
    } else {
      return ["", false];
    }
  }

  return (
    <SearchContext.Provider
      value={{
        setSearchTermSavedMovies,
        setCheckboxfilterMode,
        setCheckboxfilterModeSaved,
        checkboxfilterModeSaved,
        checkboxfilterMode,
        searchTermMovies,
        setSearchTermMovies,
        setSearchTermMoviesValue,
        searchTermSavedMovies,
        setTerms,
        resetSearchTermsContext,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
