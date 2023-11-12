import { useState, useEffect, useContext, React } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import Header from "../../Header/Header";
import FormNavigation from '../FormNavigation/FormNavigation'
import apiMain from "../../../utils/ApiMain";
import { EMAIL_REGEX } from "../../../utils/Constants";
import { PreloaderContext } from "../../../contexts/PreloaderContext";
import Preloader from "../../Movies/Preloader/Preloader";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Login(props) {
  const navigate = useNavigate();
  const { setLoggedIn } = props;
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const [isActiveInputField, setIsActiveInputField] = useState(true);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [errorResMessage, setErrorResMessage] = useState("");
  const [isActiveSubmitButton, setIsActiveSubmitButton] = useState(false);
  const { isActivePreloader, setStatePreloader } = useContext(PreloaderContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  function handleSubmitRegister(event) {
    event.preventDefault();
    setIsActiveInputField(false);
    loginUser(dataForm);
    setIsActiveInputField(true);
  }

  function checkActivateSubmitButton() {
    const hasEmptyField = Object.values(dataForm).some((value) => value === "");
    const hasError = Object.values(errorMessages).some(
      (message) => message !== ""
    );
    setIsActiveSubmitButton(!hasEmptyField && !hasError);
  }

  function validateFormFields(formElement) {
    let errorMessage = "";
    if (formElement.id === "email") {
      const emailRegex = EMAIL_REGEX; // Проверка валидности мыла
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

  function handleChangeLogin(event) {
    const formElement = event.target;
    setErrorResMessage("");
    setDataForm((dataForm) => ({
      ...dataForm,
      [formElement.id]: formElement.value,
    }));
    validateFormFields(formElement);
  }

  useEffect(() => {
    checkActivateSubmitButton();
  }, [dataForm, errorMessages]);

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/movies");
    }
  }, [props.loggedIn]); //если добавить navigate  в массив то ошибка уйдет!!! попробовать!!! [props.loggedIn, navigate])

  function loginUser(dataForm) {
    setStatePreloader(true);
    apiMain
      .authorization({ email: dataForm.email, password: dataForm.password })
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("token", data.token);
        apiMain
          .getUserInfo(data.token)
          .then((userData) => {
            setCurrentUser({ name: userData.name, email: userData.email });
          })
          .catch((error) => console.log(error.status, error.errorMessage));
        navigate("/movies");
      })
      .catch((error) => {
        setErrorResMessage(error.message);
        setIsActiveSubmitButton(false);
      })
      .finally(() => {
        setStatePreloader(false);
      });
  }

  //js
  return (
    <div className="page__container page__container-auth">
      <Header />
      <main className="content auth">
        <section className="login">
          <form
            action="#"
            className="login-form"
            onSubmit={handleSubmitRegister}
            noValidate
            method="POST"
          >
            <InputField
              id="email"
              title="E-mail"
              type="text"
              placeholder="pochta@yandex.ru"
              errorMessage={errorMessages.email}
              disabled={!isActiveInputField}
              value={dataForm.email || ""}
              onChange={handleChangeLogin}
            />
            <InputField
              id="password"
              title="Пароль"
              type="password"
              placeholder="Введите пароль"
              errorMessage={errorMessages.password}
              disabled={!isActiveInputField}
              value={dataForm.password || ""}
              onChange={handleChangeLogin}
              minLength="1"
            />
            {isActivePreloader && <Preloader />}
            <div className="login-form__button">
              <SubmitButton
                title="Войти"
                isActive={isActiveSubmitButton}
                errorMessage={errorResMessage}
              />
              <FormNavigation
                questionText={"Ещё не зарегистрированы?"}
                linkText={"Регистрация"}
                linkTo={"/signup"}
              />
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;
