import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";

import { MovieProvider } from "./contexts/MovieContext";
import { PreloaderProvider } from "./contexts/PreloaderContext";
import { SearchProvider } from "./contexts/SearchContext";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider>
      <SearchProvider>
      <CurrentUserProvider>
        <PreloaderProvider>
          <App />
        </PreloaderProvider>
      </CurrentUserProvider>
      </SearchProvider>
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
