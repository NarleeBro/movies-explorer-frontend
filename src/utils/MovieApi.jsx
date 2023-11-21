export default function apiMovies() {
  return fetch("https://api.nomoreparties.co/beatfilm-movies")
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Произршла ошибка сервера или потеряна связь");
      }
    })
    .catch((error) => {
        throw new Error("Произршла ошибка сервера или потеряна связь");
    });
}
