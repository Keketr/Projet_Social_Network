// Import the axios library for making HTTP requests
import axios from "axios";

// Create an instance of axios with predefined configuration for making requests
export const makeRequest = axios.create({
  // Set the base URL for the API requests
  baseURL: "http://localhost:8800/api/",

  // Include credentials in cross-origin requests (e.g., for handling cookies)
  withCredentials: true,
});
