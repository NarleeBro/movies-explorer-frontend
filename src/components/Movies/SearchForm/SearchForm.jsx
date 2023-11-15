import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import "./SearchForm.css";
import Checkboxfilter from "./Checkboxfilter/Checkboxfilter";
import { VisibleRowsContext } from "../../../contexts/VisibleRowsContext";

function SearchForm({
  onSearch,
  errorMessage,
  setErrorMessage,
  setCheckboxfilterMode,
  checkboxfilterMode,
  searchQuery,
  setSearchQuery,
  localStorageName,
  isSaved
}) {
  const [errorMessageNotFound, setErrorMessageNotFound] = useState("");
  const location = useLocation();

  const {resetVisibleRowsContext} = useContext(VisibleRowsContext);

  function handleCheckbox() {
    setCheckboxfilterMode(!checkboxfilterMode);
  }

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setSearchQuery("");
      setCheckboxfilterMode(false);
    }
  }, [location.pathname, setCheckboxfilterMode]);

  useEffect(() => {
    if (searchQuery !== "" || isSaved) {
      onSearch();
    }
  }, [isSaved, checkboxfilterMode]); //добавить после поиск сразу после ввода - зависимость от query - удалить


  const handleChangeInput = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setErrorMessageNotFound("");
    setErrorMessage("");
    setSearchQuery(value);
  };

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
    setErrorMessageNotFound(
      (searchQuery === "" && !isSaved) ? "Введите запрос" : ""
    );
    if (searchQuery !== "" || isSaved) {
      onSearch();
      resetVisibleRowsContext();
    }
  };

  useEffect(() => {
    const optionsLocalCopy = JSON.parse(localStorage.getItem("options-beatfilm-movies"));
    if (optionsLocalCopy && !isSaved) {
      setCheckboxfilterMode(
        optionsLocalCopy.checkboxfilterMode ? optionsLocalCopy.checkboxfilterMode : false
      );
      setSearchQuery(
        optionsLocalCopy.searchQuery ? optionsLocalCopy.searchQuery : ""
      );
    }
  }, []);

  return (
    <section className="search-form">
      <form className="search-form__search-container" onSubmit={handleSearch} noValidate>
        <div className="search-form__container">
          <input
            className="search-form__input-field"
            type="text"
            placeholder="Фильм"
            value={searchQuery}
            onChange={handleChangeInput}
            required
          ></input>
          <button
            type="submit"
            className="search-form__search-btn link"
          ></button>
        </div>
      </form>
      <div className="search-form__checkboxfilter-container">
        <Checkboxfilter onChecked={handleCheckbox} isChecked={checkboxfilterMode} />
        <span className="search-form__checkboxfilter-text">Короткометражки</span>
      </div>
      <span className="search-form__error-text">
        {errorMessage === "" ? errorMessageNotFound : errorMessage}
      </span>
    </section>
  );
}
//switcherMode заменить на Checkboxfilter к примеру!!!
export default SearchForm;
