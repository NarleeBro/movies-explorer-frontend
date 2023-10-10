import React from 'react';
import { Link } from "react-router-dom";

import './FormNavigation.css';

function FormNavigation({ questionText, linkText, linkTo }) {
  return (
    <div className="form-navigation">
      <span className="form-navigation__question">{questionText}</span>
      <Link to={linkTo} className="form-navigation__link link">{linkText}</Link>
    </div>
  );
}

export default FormNavigation;
