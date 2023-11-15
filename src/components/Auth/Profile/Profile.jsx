import { useState, useEffect, useContext, React } from "react"; //js
import { useNavigate } from "react-router-dom"; //js
import Header from "../../Header/Header";
import SubmitButton from "../SubmitButton/SubmitButton";
import Preloader from "../../Movies/Preloader/Preloader";//js
//js
import { EMAIL_REGEX, } from "../../../utils/Constants";
import { PreloaderContext } from "../../../contexts/PreloaderContext";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { SearchContext } from "../../../contexts/SearchContext";
import { VisibleRowsContext } from "../../../contexts/VisibleRowsContext";
import { MovieContext } from "../../../contexts/MovieContext";
import apiMain from "../../../utils/ApiMain";
import "./Profile.css";
//js
function Profile({ onMenuButtonClick, setLoggedIn }) {
  const navigate = useNavigate();
  const emailRegex = EMAIL_REGEX;
  const { currentUser, setCurrentUser, resetCurrentUserContext } = useContext(CurrentUserContext);
  const { resetSearchTermsContext } = useContext(SearchContext);
  const { resetVisibleRowsContext } = useContext(VisibleRowsContext);
  const { restartMoviesContext } = useContext(MovieContext);

  const [updatedUserData, setUpdatedUserData] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(true);

  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true); 

  const [isDisabledInputField, setIsDisabledInputField] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    isActivePreloader,
    setStatePreloader,
    resetIsActivePreloaderContext,
  } = useContext(PreloaderContext);

  const handleUpdateButtonClick = () => {
    setShowSubmitButton(true);
    setShowUpdateButton(false);
    setIsDisabledInputField(false);
  };

  const handleChangeInputData = (event) => {
    const formElement = event.target;
    setUpdatedUserData((dataForm) => ({
      ...dataForm,
      [formElement.id]: formElement.value,
    }));
    checkActivateSubmitButton(formElement.form);
  };

  function checkActivateSubmitButton(dataForm) {
    setErrorMessage("");
    const nameInput = dataForm.querySelector("#name");
    const emailInput = dataForm.querySelector("#email");
    // Валидность полей
    const isNameValid = nameInput.checkValidity();
    if (!isNameValid) {
      setErrorMessage(nameInput.validationMessage.split(".")[0]);
    }
    const isEmailValid = emailRegex.test(emailInput.value);
    if (!isEmailValid) {
      setErrorMessage("Указан некорректный e-mail");
    }
    const hasDataChanged =
      nameInput.value !== currentUser.name ||
      emailInput.value !== currentUser.email;
    // Активируем кнопку, когда оба поля валидны!
    if (isNameValid && isEmailValid && hasDataChanged) {
      setIsSubmitBtnDisabled(false);
    } else {
      setIsSubmitBtnDisabled(true);
    }
  }

  function handleLogoutButtonClick() {
    localStorage.clear();
    setLoggedIn(false);
    resetSearchTermsContext();
    resetCurrentUserContext();
    resetVisibleRowsContext();
    restartMoviesContext();
    resetIsActivePreloaderContext();
    navigate("/");
  }

  function updateProfile(updatedUserData) {
    setIsDisabledInputField(true);
    setStatePreloader(true);
    apiMain
      .newUserInfo({
        name: updatedUserData.name,
        email: updatedUserData.email,
      })
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
        setShowSubmitButton(false);
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        if (error.status === 409) {
          setIsDisabledInputField(false);
        }
        setIsDisabledInputField(false);
      })
      .finally(() => {
        setStatePreloader(false);
        setIsDisabledInputField(false);
      });
  }

  useEffect(() => {
    if (showSuccessMessage) {
      const timerId = setTimeout(() => {
        setShowSuccessMessage(false);
        setIsDisabledInputField(true);
        setShowUpdateButton(true);
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [showSuccessMessage]);

  function handleSubmitUpdateProfile(event) {
    event.preventDefault();
    setIsDisabledInputField(true);
    updateProfile(updatedUserData);
  }

  //js
  return (
    <div className="page__container">
      <Header onClickMenuButton={onMenuButtonClick} isLoggedIn={true}></Header>
      <main className="content">
        <section className="profile">
          <h1 className="profile__greetings">Привет, {currentUser.name}!</h1>
          <form
            className="profile__data-container"
            action="#"
            onSubmit={handleSubmitUpdateProfile}
            noValidate
            method="POST"
          >
            <div className="profile__data-row">
              <label className="profile__label">Имя</label>
              <input
                id="name"
                value={updatedUserData.name}
                type="text"
                className="profile__input"
                onChange={handleChangeInputData}
                placeholder="Введите имя"
                minLength="2"
                maxLength="30"
                required
                disabled={isDisabledInputField}
              />
            </div>
            <div className="profile__data-row">
              <label className="profile__label">E-mail</label>
              <input
                id="email"
                value={updatedUserData.email}
                type="email"
                className="profile__input"
                onChange={handleChangeInputData}
                placeholder="Введите email"
                required
                disabled={isDisabledInputField}
              />
            </div>

            {showUpdateButton && (
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
                  onClick={handleLogoutButtonClick}
                >
                  Выйти из аккаунта
                </button>
              </div>
            )}

            {showSubmitButton && (
              <div className="profile__update-container">
                <span className="profile__span-update">{errorMessage}</span>
                <SubmitButton
                  title="Сохранить"
                  isSubmitBtnDisabled={isSubmitBtnDisabled}
                />
              </div>
            )}
          </form>
          {showSuccessMessage && <span>Данные профиля успешно изменены</span>}
          {isActivePreloader && <Preloader />}
        </section>
      </main>
    </div>
  );
}

export default Profile;
