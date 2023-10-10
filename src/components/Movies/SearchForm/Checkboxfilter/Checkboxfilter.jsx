import React from "react";

import "./Checkboxfilter.css";

function Checkboxfilter({ isChecked, onChecked }) {
  const handleCheckbox = (event) => {
    onChecked(event.target.checked);
  };

  return (
    <label className="checkboxfilter">
      <input
        className="checkboxfilter__input"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckbox}
      />
      <span className="checkboxfilter__slider"></span>
    </label>
  );
}

export default Checkboxfilter;
