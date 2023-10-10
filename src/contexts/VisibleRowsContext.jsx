import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const VisibleRowsContext = createContext();

export const VisibleRowsProvider = ({ children }) => {
  const [visibleRows, setVisibleRows] = useState(2);
  const [visibleRowsSaved, setVisibleRowsSaved] = useState(2);
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState("");

  useEffect(() => {
    const pathname = location.pathname;
    if (
      (prevPathname === "/movies" ||
        prevPathname === "" ||
        prevPathname === "/saved-movies") &&
      (pathname === "/movies" || pathname === "/saved-movies")
    ) {
    } else {
      resetRows();
    }
    setPrevPathname(pathname);
  }, [location.pathname]);

  const addRows = () => {
    const pathname = location.pathname;
    if (pathname === "/movies") setVisibleRows(visibleRows + 1);
    else {
      setVisibleRowsSaved(visibleRowsSaved + 1);
    }
  };

  const getRows = () => {
    const pathname = location.pathname;
    if (pathname === "/movies") return visibleRows;
    else {
      return visibleRowsSaved;
    }
  };

  const resetRows = () => {
    setVisibleRows(2);
    setVisibleRowsSaved(2);
  };

  return (
    <VisibleRowsContext.Provider
      value={{ getRows, addRows, visibleRows, visibleRowsSaved }}
    >
      {children}
    </VisibleRowsContext.Provider>
  );
};
