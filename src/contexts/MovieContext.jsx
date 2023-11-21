import { createContext, useState, useEffect } from "react";
import apiMain from "../utils/ApiMain";
import apiMovies from "../utils/MovieApi";
export const MovieContext = createContext();
export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const restartMoviesContext = () => {
    setSavedMovies([]);
    setMovies([]);
  };

  function saveSavedMovies() {
    const savedMoviesLocalVer = JSON.parse(
      localStorage.getItem("saved-movies")
    );
    if (!savedMoviesLocalVer) {
      apiMain
        .getMovies()
        .then((movieList) => {
          const newMovies = movieList.map((movie) => ({
            duration: movie.duration,
            trailerLink: movie.trailerLink,
            backdrop: movie.thumbnail,
            movieId: movie.movieId,
            title: movie.nameRU,
            _id: movie._id,
          }));
          setSavedMovies(newMovies);
          localStorage.setItem("saved-movies", JSON.stringify(newMovies));
        })
        .catch((error) => {
          console.error(`Ошибкак при поиске фильма ${error}`);
        });
    } else {
      setSavedMovies(savedMoviesLocalVer);
    }
  }

  function downloudsMovies() {
    const moviesLocalCopy =
      JSON.parse(localStorage.getItem("sorted-beatfilm-movies")) || [];
    if (moviesLocalCopy.length === 0) {
      const optionsLocalCopy = JSON.parse(
        localStorage.getItem("options-beatfilm-movies")
      );
      if (optionsLocalCopy) {
        if (!JSON.parse(localStorage.getItem("beatfilm-movies"))) {
          apiMovies()
            .then((data) => {
              localStorage.setItem("beatfilm-movies", JSON.stringify(data));
              return true;
            })
            .catch((error) => {
              setMovies(moviesLocalCopy);
              return false;
            });
        } else {
          return true;
        }
      } else {
        setMovies(moviesLocalCopy);
        return false;
      }
    } else {
      setMovies(moviesLocalCopy);
      return false;
    }
  }

  useEffect(() => {
    setSavedMovies([]);
    setMovies([]);
  }, []);


  const addSavedMovie = (movieId) => {
    Promise.resolve(localStorage.getItem("beatfilm-movies"))
      .then((moviesData) => JSON.parse(moviesData))
      .then((mov) => {
        const movie = mov.find((movie) => movie.id === movieId);
        apiMain
          .addMovie({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: ["https://api.nomoreparties.co", movie.image.url].join(""),
            trailerLink: movie.trailerLink,
            thumbnail: [
              "https://api.nomoreparties.co",
              movie.image.formats.thumbnail.url,
            ].join(""),
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
          })
          .then((addedMovie) => {
            const updatedSavedMovies = [
              ...savedMovies,
              {
                duration: addedMovie.duration,
                trailerLink: addedMovie.trailerLink,
                backdrop: addedMovie.thumbnail,
                movieId: addedMovie.movieId,
                title: addedMovie.nameRU,
                _id: addedMovie._id,
              },
            ];
            setSavedMovies(updatedSavedMovies);
            localStorage.setItem(
              "saved-movies",
              JSON.stringify(updatedSavedMovies)
            );
          })
          .catch((error) => console.error(`Ошибка сохранения фильма 1 ${error}`));
      })
      .catch((error) => {
        console.error(`Ошибка сохранения фильма 2 ${error}`);
      })
  };

  const addMovieList = (moviesList) => {
    let newMoviesList = [];
    moviesList.forEach((movie) => {
      newMoviesList.push({
        duration: movie.duration,
        trailerLink: movie.trailerLink,
        backdrop: [
          "https://api.nomoreparties.co",
          movie.image.formats.thumbnail.url,
        ].join(""),
        movieId: movie.id,
        title: movie.nameRU,
      });
    });
    setMovies(newMoviesList);
    localStorage.setItem(
      "sorted-beatfilm-movies",
      JSON.stringify(newMoviesList)
    );
  };
  const addSavedMovieList = (savedMoviesList) => {
    setSavedMovies(savedMoviesList);
  };
  const delSavedMovie = (movieId) => {
    const index = savedMovies.findIndex(
      (savedMovie) => savedMovie.movieId === movieId
    );

    apiMain
      .delMovie(savedMovies[index]._id)
      .then((response) => {
        const updatedSavedMovies = savedMovies.filter(
          (savedMovie, i) => i !== index
        );
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem(
          "saved-movies",
          JSON.stringify(updatedSavedMovies)
        );
      })
      .catch((error) => {
        console.error(`Ошибка при удалении фильиа ${error}`);
      });
  };

  return (
    <MovieContext.Provider
      value={{
        restartMoviesContext,
        savedMovies,
        addSavedMovie,
        delSavedMovie,
        addMovieList,
        downloudsMovies,
        saveSavedMovies,
        addSavedMovieList,
        movies,
        savedMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
