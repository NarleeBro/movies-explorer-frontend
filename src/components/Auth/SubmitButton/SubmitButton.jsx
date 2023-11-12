import React, { useState } from "react";

import "./SubmitButton.css";

function SubmitButton({ title, errorMessage, inActive }) {

  return (
    <>
      <button
        type="submit"
        className={`submit-button link ${inActive ? "submit-button_inactive" : ""
          }`}
        disabled={inActive}
      >
        {title}
      </button>
    </>
  );
}

export default SubmitButton;
