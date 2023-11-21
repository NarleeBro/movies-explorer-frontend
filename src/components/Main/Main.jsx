import React from "react";

import Landing from "./Landing/Landing";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main(props) { //js props
  return (
    <div className="page__container">
      <Header isLoggedIn={props.isLoggedIn} onClickMenuButton={props.onMenuButtonClick} />
      <main className="content">
        <Landing />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
