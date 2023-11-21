class ApiMain {
  constructor(options) {
    this._url = options.baseUrl;
    this.headers = options.headers;
  }

  _checkRes(res, errorMessage) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        const error = new Error(errorMessage);
        error.status = res.status;
        error.message = data.message;
        throw error;
      });
    }
  }

  authorization(userData) {
    return fetch(`${this._url}/signin`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkRes(
        res,
        "Авторизоваться не вышло. Повторите попытку"
      );
    });
  }

  getMovies() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).then((res) => {
      return this._checkRes(
        res,
        "Данные о списке фильмов не были успешно получены"
      );
    });
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).then((res) => {
      return this._checkRes(
        res,
        "Данные пользователя не получены!"
      );
    });
  }

  newUserInfo(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => {
      return this._checkRes(
        res,
        "Ошибка при редактировании данных пользователя!"
      );
    });
  }

  delMovie(movieId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies/${movieId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }).then((res) => {
      return this._checkRes(
        res,
        "Ошибка при удалении фильма"
      );
    });
  }

  addMovie(movie) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(movie),
    }).then((res) => {
      return this._checkRes(
        res,
        "Данные о фильме не были успешно получены сервером"
      );
    });
  }

  register(userData) {
    return fetch(`${this._url}/signup`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkRes(
        res,
        "Ошибкак при регистрации. Повторите попытку"
      );
    });
  }
}

const apiMain = new ApiMain({
  baseUrl: 'https://api.narleebro.nomoredomainsicu.ru',
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiMain;
