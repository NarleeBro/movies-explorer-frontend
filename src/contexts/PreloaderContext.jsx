import { createContext, useState, useEffect } from "react";
export const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [isActivePreloader, setIsActivePreloader] = useState(false);
  const setStatePreloader = (value) => {
    setIsActivePreloader(value);
  };
  const resetIsActivePreloaderContext = () => {
    setIsActivePreloader(false);
  };
  useEffect(() => {
    setIsActivePreloader(false);
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        resetIsActivePreloaderContext,
        isActivePreloader,
        setStatePreloader
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};
