// Importing necessary modules
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Controller function to get user information
export const getUser = (req, res) => {
  // Extract userId from the request parameters
  const userId = req.params.userId;
  // SQL query to retrieve user information based on userId
  const q = "SELECT * FROM users WHERE id=?";

  // Execute the query
  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // Destructure the data to remove sensitive information (e.g., password)
    const { password, ...info } = data[0];

    // Send the user information in the response
    return res.json(info);
  });
};

// Controller function to update user information
export const updateUser = (req, res) => {
  // Extract the JWT token from the request cookies
  const token = req.cookies.accessToken;

  // Check if the token exists
  if (!token) {
    console.error("Token is not provided");
    return res.status(401).json("Not authenticated!");
  }

  // Verify the token and extract user information
  jwt.verify(token, "secretkey", (err, userInfo) => {
    // Handle token verification errors
    if (err) {
      console.error(err);
      return res.status(403).json("Token is not valid!");
    }

    // SQL query to update user information in the database
    const q =
      "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id=? ";

    // Execute the update query

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }

        // Check if the update affected any rows
        if (data.affectedRows > 0) return res.json("Updated!");

        // If no rows were affected, user doesn't have permission to update
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};
