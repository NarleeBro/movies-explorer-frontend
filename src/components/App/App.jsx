import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { VisibleRowsProvider } from "../../contexts/VisibleRowsContext";
import { MovieContext } from "../../contexts/MovieContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SearchContext } from "../../contexts/SearchContext";

import Menu from "../Header/Menu/Menu";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import Profile from "../Auth/Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import apiMain from "../../utils/ApiMain";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { addMovieList, addSavedMovieList } = useContext(MovieContext);
  const { searchTermMovies, searchTermSavedMovies } = useContext(SearchContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    handleCheckToken();
  }, []);

  const closeAllPopup = () => {
    setIsMenuOpen(false);
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleSetLoggedIn = (value) => {
    setLoggedIn(value);
  };

  function handleCheckToken() {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      apiMain
        .getUserInfo(jwt)
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((error) => {
          console.error(`Ошибка при загрузке начальных данных ${error}`);
        })
        .finally(() => { });
    } else {
      setLoggedIn(false);
    }
  }

  function findMovieByTitle(storedMovies) {
    let sortedMovies = storedMovies.filter((movie) => {
      if (movie.title) {
        return movie.title.toLowerCase().includes(searchTermSavedMovies.toLowerCase());
      }
      if (movie.nameRU) {
        return movie.nameRU.toLowerCase().includes(searchTermMovies.toLowerCase());
      }
      return null;
    });
    return sortedMovies;
  }

  function findMovieByDuration(storedMovies) {
    let sortedMovies = storedMovies.filter(
      (movie) => movie.duration <= 40
    );
    return sortedMovies;
  }

  function searchFilter(isCheckedCheckboxfilter, movieListName) {
    const storedMovies = JSON.parse(localStorage.getItem(movieListName));
    if (!storedMovies) {
      return;
    }
    let sortedMovies;
    sortedMovies = findMovieByTitle(storedMovies);
    if (isCheckedCheckboxfilter) {
      sortedMovies = findMovieByDuration(sortedMovies);
    }
    if (sortedMovies.length === 0) {
      setErrorMessage("Ничего не нашел. Введите что-нибудь");
    } else {
      setErrorMessage("");
    }
    if (movieListName === "beatfilm-movies")
      addMovieList(sortedMovies);
    if (movieListName === "saved-movies") {
      addSavedMovieList(sortedMovies);
    }
  }

  return (
    <div className="page">
      <VisibleRowsProvider>
        <Routes>
          <Route
            path="/"
            element={<Main isLoggedIn={loggedIn} onMenuButtonClick={handleOpenMenu} />}
          />
          <Route
            exact
            path="/signin"
            element={
              <Login loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} />
            }
          />
          <Route
            exact
            path="/signup"
            element={<Register loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} />
            }
          />
          <Route
            exact
            path="/profile"
            element={<ProtectedRouteElement
              element={Profile}
              loggedIn={loggedIn}
              onMenuButtonClick={handleOpenMenu}
              setLoggedIn={handleSetLoggedIn} />
            }
          />
          <Route
            exact
            path="/movies"
            element={<ProtectedRouteElement
              element={Movies}
              onMenuButtonClick={handleOpenMenu}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              loggedIn={loggedIn}
              searchFilter={searchFilter} />
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={<ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
              onMenuButtonClick={handleOpenMenu}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              searchFilter={searchFilter} />
            }
          />
          <Route path="*" element={<NotFound isLoggedIn={loggedIn} />} />
        </Routes>
        <Menu isOpen={isMenuOpen} onClose={closeAllPopup} />
      </VisibleRowsProvider>
    </div>
  );
}

export default App;
