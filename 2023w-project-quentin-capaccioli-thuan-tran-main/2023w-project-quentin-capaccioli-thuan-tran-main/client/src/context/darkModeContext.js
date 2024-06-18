// Import React hooks and context creation
import { createContext, useEffect, useState } from "react";

// Create a new context for managing dark mode
export const DarkModeContext = createContext();

// DarkModeContextProvider component for managing dark mode state
export const DarkModeContextProvider = ({ children }) => {
  // State for managing dark mode status, initialized from localStorage or defaulting to false
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Function to toggle between dark and light mode
  const toggle = () => {
    setDarkMode(!darkMode);
  };

  // Effect to update localStorage when dark mode changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Render the DarkModeContext.Provider with the dark mode state and toggle function
  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
