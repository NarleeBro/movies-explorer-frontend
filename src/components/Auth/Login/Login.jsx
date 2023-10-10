import { React } from "react";

import "./Login.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import Header from "../../Header/Header";

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
            <InputField title={"Пароль"} type={"password"} placeholder={""} />
            <div className="login-form__button">
              <SubmitButton title={"Войти"} />
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;
