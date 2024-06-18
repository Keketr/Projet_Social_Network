// Import Axios for making HTTP requests and React hooks for context creation and state management
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create a new context for managing authentication
export const AuthContext = createContext();

// AuthContextProvider component for managing current user state and login function
export const AuthContextProvider = ({ children }) => {
  // State for managing the current user, initialized from localStorage or defaulting to null
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Function for user login, making a request to the login endpoint
  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );

    // Set the current user state with the response data
    setCurrentUser(res.data);
  };

  // Effect to update localStorage when the current user changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Render the AuthContext.Provider with the current user state and login function
  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
