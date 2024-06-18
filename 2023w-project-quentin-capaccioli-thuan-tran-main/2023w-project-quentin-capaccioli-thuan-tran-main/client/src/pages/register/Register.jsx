// Import React hooks and components
import { useState } from "react";
import { Link } from "react-router-dom";

// Import styles and Axios for making HTTP requests
import "./register.scss";
import axios from "axios";

// Functional component for the registration page
const Register = () => {
  // State to manage form inputs and error messages
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  // Handle input changes and update the state accordingly
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle registration button click
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the registration endpoint with the input data
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    } catch (err) {
      // Handle registration error and update the state with the error message
      setErr(err.response.data);
    }
  };

  // Log error to the console for debugging purposes
  console.log(err);

  // Render the registration form and page structure
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Fake social</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          {/* Link to the login page */}
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          {/* Registration form */}
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {/* Display registration error message if present */}
            {err && err}
            {/* Register button */}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the Register component as the default export
export default Register;
