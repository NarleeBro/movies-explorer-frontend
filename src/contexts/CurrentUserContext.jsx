//js полностью
import { createContext, useState, useEffect} from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    "email" : "",
    "name" : "",
  });

  const resetCurrentUserContext = () => {
    setCurrentUser({
      "email" : "",
      "name" : "",
    });
  };

  useEffect(() => {
    setCurrentUser({
      "email" : "",
      "name" : "",
    });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        resetCurrentUserContext
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
