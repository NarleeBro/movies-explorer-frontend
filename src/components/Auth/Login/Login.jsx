import { React } from "react";

import "./Login.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import Header from "../../Header/Header";
import FormNavigation from '../FormNavigation/FormNavigation'

function Login() {
  return (
    <div className="page__container page__container-auth">
      <Header />
      <main className="content auth">
        <section className="login">
          <form className="login-form">
            <InputField
              title={"E-mail"}
              type={"email"}
              placeholder={"pochta@yandex.ru"}
            />
            <InputField title={"Пароль"} type={"password"} placeholder={"Введите пароль"} />
            <div className="login-form__button">
              <SubmitButton title={"Войти"} />
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
