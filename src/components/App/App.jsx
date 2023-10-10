import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieProvider } from "../../contexts/MovieContext";
import { VisibleRowsProvider } from "../../contexts/VisibleRowsContext";

import Menu from "../Header/Menu/Menu";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import movieList from "../../utils/movieList";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import Profile from "../Auth/Profile/Profile";
import NotFound from "../NotFound/NotFound";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(movieList);
  }, []);


  const closeAllPopup = () => {
    setIsMenuOpen(false);
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleLogin = () => {
    setIsMenuOpen(true);
  };

  return (
    <div className="page">
      <MovieProvider>
        <VisibleRowsProvider>
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              exact
              path="/signin"
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              exact
              path="/signup"
              element={<Register onRegister={handleLogin} />}
            />
            <Route
              exact
              path="/profile"
              element={
                <Profile
                  onProfile={handleLogin}
                  onMenuButtonClick={handleOpenMenu}
                  name={"Виталий"}
                  email={"example@yandex.ru"}
                />
              }
            />
            <Route
              exact
              path="/movies"
              element={
                <Movies cards={cards} onMenuButtonClick={handleOpenMenu} />
              }
            />
            <Route
              exact
              path="/saved-movies"
              element={<SavedMovies onMenuButtonClick={handleOpenMenu} />}
            />
            <Route exact path="/404" element={<NotFound />} />
            <Route exact path="/" element={<Main />} />
          </Routes>
          <Menu isOpen={isMenuOpen} onClose={closeAllPopup} />
        </VisibleRowsProvider>
      </MovieProvider>
    </div>
  );
}

export default App;
