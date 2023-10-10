import { useState, React } from "react";
import Header from "../../Header/Header";
import SubmitButton from "../SubmitButton/SubmitButton";

import "./Profile.css";

function Profile({ name, email, onMenuButtonClick }) {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updateButton, setUpdateButton] = useState(true);
  const errorMessage = "При обновлении профиля произошла ошибка";

  const handleUpdateButtonClick = () => {
    setUpdateButton(!updateButton);
  };

  const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setUpdatedEmail(event.target.value);
  };

  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick}></Header>
      <main className="content">
        <section className="profile">
          <h1 className="profile__greetings">Привет, {name}!</h1>
          <form className="profile__data-container">
            <div className="profile__data-row">
              <label className="profile__label">Имя</label>
              <input
                value={updatedName}
                type="text"
                className="profile__input"
                onChange={handleNameChange}
                placeholder="Имя"
                minLength="2"
                maxLength="30"
              />
            </div>
            <div className="profile__data-row">
              <label className="profile__label">E-mail</label>
              <input
                value={updatedEmail}
                type="email"
                className="profile__input"
                onChange={handleEmailChange}
                placeholder="Email"
              />
            </div>
            {!updateButton && (
              <div className="profile__update-container">
                <button
                  className="profile__update-btn link"
                  type="button"
                  onClick={handleUpdateButtonClick}
                >
                  Редактировать
                </button>
                <button
                  className="profile__logout button-style link"
                  type="button"
                >
                  Выйти из аккаунта
                </button>
              </div>
            )}
          </form>
          {updateButton && (
            <div className="profile__update-container">
              <span className="profile__span-update">{errorMessage}</span>
              <SubmitButton
                title="Сохранить"
                inActive={true}
                onClick={handleUpdateButtonClick}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
