import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";

const MainContext = createContext();

export function MainProvider(props) {

  useEffect(() => {
    let themeLocalStorage = localStorage.getItem("theme");
    if (themeLocalStorage === null) {
      themeLocalStorage = "dark";
      localStorage.setItem("theme", "dark");
    }

    let authLocalStorage = localStorage.getItem("auth");
    if (authLocalStorage === null) {
      authLocalStorage = "";
      localStorage.setItem("auth", "");
    }
    setMainState({
      theme: themeLocalStorage,
      auth: authLocalStorage,
    });
  }, []);

  const [mainState, setMainState] = useState({
    theme: "dark",
    auth: "",
  });

  function changeContext(action) {
    switch (action.state) {
      case "theme":
        if (mainState.theme === 'light') {
                    localStorage.setItem('theme', 'dark')
                    setMainState({
                        theme: 'dark',
                        auth: mainState.auth
                    })
                } else {
                    localStorage.setItem('theme', 'light')
                    setMainState({
                        theme: 'light',
                        auth: mainState.auth
                    })
                }
                break;
            case 'auth':
                localStorage.setItem('auth', action.auth)
                setMainState({
                    auth: action.auth,
                    theme: mainState.theme
                })
                break;
            default:
                throw new Error('Action não encontrada')
    }
  }

  return (
    <MainContext.Provider value={{ mainState, changeContext }}>
      {props.children}
    </MainContext.Provider>
  );
}

export function useContexts() {
  const context = useContext(MainContext);
  return context;
}