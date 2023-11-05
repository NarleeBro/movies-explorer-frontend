import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([ {
    title: 'Бойцовский клуб',
    duration: 153,
    backdrop: 'https://avatars.mds.yandex.net/i?id=0da34e0e3b8b85eb4b141769be4e034a_sr-9181622-images-thumbs&n=13',
  }
  ,{
    title: 'В бой идут одни старики',
    duration: 87,
    backdrop: 'https://avatars.mds.yandex.net/i?id=ec78864c553b693d49e69a956cfb9891_sr-10651780-images-thumbs&n=13',
  },

  {
    title: 'Довод',
    duration: 151,
    backdrop: 'https://avatars.mds.yandex.net/i?id=0da34e0e3b8b85eb4b141769be4e034a_sr-9181622-images-thumbs&n=13',
  }

]);

  const addMovie = (movie) => {
    setSavedMovies([...savedMovies, movie]);
  };

  const deleteMovie = (movieTitle) => {
    setSavedMovies(savedMovies.filter((movie) => movie.title !== movieTitle));
  };

  return (
    <MovieContext.Provider value={{ savedMovies, addMovie, deleteMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
