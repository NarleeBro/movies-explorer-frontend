import { React } from "react";

import "./Register.css";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormNavigation from "../FormNavigation/FormNavigation";
import Header from "../../Header/Header";

function Register() {
  return (
    <div className="page__container page__container-auth">
      <Header />
      <main className="content auth">
        <section className="register">
          <form className="register-form">
            <InputField title={"Имя"} type={"text"} placeholder={"Имя"}/>
            <InputField title={"E-mail"} type={"text"} placeholder={"E-mail"}/>
            <InputField title={"Пароль"} type={"password"} placeholder={"Пароль"}/>
            <div className="register-form__button">
              <SubmitButton title={"Зарегистрироваться"} />
            </div>
          </form>
          <FormNavigation
            questionText={"Уже зарегистрированы?"}
            linkText={"Войти"}
            linkTo={"/signin"}
          />
        </section>
      </main>
    </div>
  );
}

export default Register;
