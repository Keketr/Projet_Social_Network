// Import React hooks, components, and styles
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

// Functional component for the login page
const Login = () => {
  // State for managing form inputs and error messages
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  // Hook for navigating between pages
  const navigate = useNavigate();

  // Handle input changes and update the state accordingly
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Access the login function from the AuthContext
  const { login } = useContext(AuthContext);

  // Handle login button click
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt to log in using the provided credentials
      await login(inputs);
      // Redirect to the home page on successful login
      navigate("/");
    } catch (err) {
      // Handle login error and update the state with the error message
      setErr(err.response.data);
    }
  };

  // Render the login form and page structure
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          {/* Link to the registration page */}
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          {/* Login form */}
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {/* Display login error message if present */}
            {err && err}
            {/* Login button */}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
