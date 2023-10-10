import React from 'react';

import './InputField.css';

function InputField({title, type, placeholder}) {
  return (
    <div className="input-field">
      <label className="input-field__title input-field__text">{title}</label>
      <input
        type={type}
        className="input-field__input"
        placeholder={placeholder}
        minLength="2"
        maxLength="30"
        required
        noNoValidate
      />
      <span className="input-field__error-message input-field__text">{}</span>
    </div>
  );
}

export default InputField;
