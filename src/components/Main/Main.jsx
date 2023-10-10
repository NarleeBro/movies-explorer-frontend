import React from "react";

import Landing from "./Landing/Landing";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Main.css";

function Main() {
  return (
    <div className="page__container">
      <Header />
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
