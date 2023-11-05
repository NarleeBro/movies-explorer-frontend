import React, { useState } from "react";

import "./SearchForm.css";
import Checkboxfilter from "./Checkboxfilter/Checkboxfilter";

function SearchForm() {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckbox({ value }) {
    setIsChecked(value);
  }

  return (
    <section className="search-form">
      <form className="search-form__search-container">
        <div className="search-form__container">
          <input
            className="search-form__input-field"
            type="text"
            placeholder="Фильм"
            required
          ></input>
          <button
            type="submit"
            className="search-form__search-btn link"
          ></button>
        </div>
      </form>
      <div className="search-form__checkboxfilter-container">
        <Checkboxfilter onChecked={handleCheckbox} isChecked={isChecked} />
        <span className="search-form__checkboxfilter-text">Короткометражки</span>
      </div>
    </section>
  );
}

export default SearchForm;
