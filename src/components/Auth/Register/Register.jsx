import { useState, useEffect, useContext, React } from "react"; //js
import { useNavigate } from "react-router-dom"; //js
import "./Register.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormNavigation from "../FormNavigation/FormNavigation";
import Header from "../../Header/Header";

import Preloader from "../../Movies/Preloader/Preloader";
import { EMAIL_REGEX } from "../../../utils/Constants";
import { PreloaderContext } from "../../../contexts/PreloaderContext";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import apiMain from "../../../utils/ApiMain";
//js
function Register(props) {
  const navigate = useNavigate();
  const { setLoggedIn } = props;
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isActiveInputField, setIsActiveInputField] = useState(true);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [sentDataForm, setSentDataForm] = useState({
    email: "",
    password: "",
  });
  const [errorResMessage, setErrorResMessage] = useState("");
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(false);
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true); 

  function handleSubmitRegister(event) {
    event.preventDefault();
    setIsActiveInputField(false);
    registerUser(dataForm);
    setIsActiveInputField(true);
  }

  function checkActivateSubmitButton() {
    const hasEmptyField = Object.values(dataForm).some((value) => value.length === 0);
    const hasError = Object.values(errorMessages).some(
      (message) => message !== ""
    );
    // const hasDataChanged = (dataForm.email !== sentDataForm.email || dataForm.name !== sentDataForm.name);
    // setIsActiveSubmitButton(!hasEmptyField && !hasError && hasDataChanged);
    if (!hasEmptyField && !hasError && errorResMessage.length === 0) {
      setIsSubmitBtnDisabled(false);
    } else {
      setIsSubmitBtnDisabled(true);
    }
  }

  function validateFormFields(formElement) {
    let errorMessage = "";
    if (formElement.id === "email") {
      // Валидность мыла
      const emailRegex = EMAIL_REGEX;
      if (!emailRegex.test(formElement.value)) {
        errorMessage = "Указан некорректный e-mail";
      }
    } else {
      if (!formElement.validity.valid) {
        errorMessage = formElement.validationMessage.split(".")[0];
      }
    }


    setErrorMessages((messages) => ({
      ...messages,
      [formElement.id]: errorMessage,
    }));
  }

  function handleChangeRegister(event) {
    const formElement = event.target;
    setErrorResMessage("");
    setDataForm((dataForm) => ({
      ...dataForm,
      [formElement.id]: formElement.value,
    }));
    validateFormFields(formElement);
  }

  function registerUser(dataForm) {
    setErrorResMessage("");
    setIsSubmitBtnDisabled(true);
    setStatePreloader(true);
    apiMain
      .register(dataForm)
      .then((data) => {
        apiMain
          .authorization({ email: dataForm.email, password: dataForm.password })
          .then((data) => {
            setLoggedIn(true);
            localStorage.setItem("token", data.token);
            apiMain
              .getUserInfo(data.token)
              .then((userData) => {
                setCurrentUser({ name: userData.name, email: userData.email });
                setIsSubmitBtnDisabled(false);
              })
              .catch((error) => console.log(error.status, error.errorMessage));
            navigate('/movies');
          })
          .catch((error) => {
            setSentDataForm({ email: dataForm.email, name: dataForm.name })
            setIsSubmitBtnDisabled(false);
            console.log(error.status, error.errorMessage);
          });
      })
      .catch((error) => {
        if (error.status === 409 && error.message === 'Пользователь с таким email уже зарегистрирован') {
          setErrorResMessage(error.message);
        }
        else {
          setErrorResMessage(error.message);
        }
        setIsActiveSubmitButton(false);
        setIsSubmitBtnDisabled(false);
        setSentDataForm({ email: dataForm.email, name: dataForm.name });
      })
      .finally(() => {
        setStatePreloader(false);
        setIsSubmitBtnDisabled(false);
      });
  }

  useEffect(() => {
    checkActivateSubmitButton();
  }, [dataForm, errorResMessage]);

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/movies");
    }
  }, [props.loggedIn]);

  //js
  return (
    <div className="page__container page__container-auth">
      <Header />
      <main className="content auth">
        <section className="register">
          <form
            action="#"
            className="register-form"
            onSubmit={handleSubmitRegister}
            noValidate
            method="POST"
          >
            <InputField
              id="name"
              title="Имя"
              type="text"
              placeholder="Введите имя"
              minLength="2"
              maxLength="30"
              errorMessage={errorMessages.name}
              disabled={!isActiveInputField}
              value={dataForm.name || ""}
              onChange={handleChangeRegister}
            />
            <InputField
              id="email"
              title="E-mail"
              type="text"
              placeholder="Введите e-mail"
              errorMessage={errorMessages.email}
              disabled={!isActiveInputField}
              value={dataForm.email || ""}
              onChange={handleChangeRegister}
            />
            <InputField
              id="password"
              title="Пароль"
              type="password"
              placeholder="Введите пароль"
              errorMessage={errorMessages.password}
              disabled={!isActiveInputField}
              value={dataForm.password || ""}
              onChange={handleChangeRegister}
              minLength="3"
            />
            {errorResMessage.length > 0 && <span className="input-field__error-message input-field__text active">{errorResMessage}</span>}
            {isActivePreloader && <Preloader />}
            <div className="register-form__button">
              <SubmitButton
                title={"Зарегистрироваться"}
                isActive={isActiveSubmitButton}
                errorMessage={errorResMessage}
                isSubmitBtnDisabled={isSubmitBtnDisabled}
              />
              <FormNavigation
                questionText={"Уже зарегистрированы?"}
                linkText={"Войти"}
                linkTo={"/signin"}
              />
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Register;
