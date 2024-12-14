import { createContext, useContext, useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const initialTheme =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(!theme);
    if (theme === false) {
      toast.info("Dark Mode is not stable", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: `${theme ? "light" : "dark"}`,
        transition: Slide,
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
