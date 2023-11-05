import React, { useState } from "react";

import "./SubmitButton.css";

function SubmitButton({ title, onClick, inActive }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      type="submit"
      className={`submit-button link ${
        inActive ? "submit-button_inactive" : ""
      }`}
    >
      {title}
    </button>
  );
}

export default SubmitButton;
