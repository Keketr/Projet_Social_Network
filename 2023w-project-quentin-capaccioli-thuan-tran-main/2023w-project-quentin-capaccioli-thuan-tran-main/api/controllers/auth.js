import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Controller function for user registration
export const register = (req, res) => {
  // Check if the username already exists in the database
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";

  db.query(checkUserQuery, [req.body.username], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // If the username already exists, send a conflict response
    if (data.length) return res.status(409).json("User already exists!");

    // Hash the password before storing it in the database
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create a new user in the database
    const createUserQuery =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(createUserQuery, [values], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send a success message after creating the user
      return res.status(200).json("User has been created.");
    });
  });
};

// Controller function for user login
export const login = (req, res) => {
  // Check if the provided username exists in the database
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";

  db.query(checkUserQuery, [req.body.username], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // If the username doesn't exist, send a not found response
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check if the provided password matches the stored hashed password
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    // If the password is incorrect, send a bad request response
    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    // Exclude the password from the user information before sending it in the response
    const { password, ...others } = data[0];

    // Set the JWT token as an HTTP-only cookie and send user information
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

// Controller function for user logout
export const logout = (req, res) => {
  // Clear the access token cookie on the client side
  res
    .clearCookie("accessToken", {
      secure: true, // Enable this for HTTPS
      sameSite: "none", // Required for cross-site cookies
    })
    .status(200)
    .json("User has been logged out.");
};
