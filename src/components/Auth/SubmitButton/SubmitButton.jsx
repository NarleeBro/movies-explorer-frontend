import React, { useState } from "react";

import "./SubmitButton.css";

function SubmitButton({ title, errorMessage, inActive, isSubmitBtnDisabled }) {

  return (
    <>
      <button
        type="submit"
        className={`submit-button link ${isSubmitBtnDisabled ? "submit-button_inactive" : ""
          }`}
        disabled={isSubmitBtnDisabled}
      >
        {title}
      </button>
    </>
  );
}

export default SubmitButton;
