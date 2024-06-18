import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Controller function to get likes for a specific post
export const getLikes = (req, res) => {
  // SQL query to retrieve user IDs who liked a particular post
  const q = "SELECT userId FROM likes WHERE postId = ?";

  // Execute the query
  db.query(q, [req.query.postId], (err, data) => {
    // Handle potential errors
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // Send user IDs who liked the post in the response
    return res.status(200).json(data.map((like) => like.userId));
  });
};

// Controller function to add a like to a post
export const addLike = (req, res) => {
  // Extract the JWT token from the request cookies
  const token = req.cookies.accessToken;

  // Check if the token exists
  if (!token) return res.status(401).json("Not logged in!");

  // Verify the token and extract user information
  jwt.verify(token, "secretkey", (err, userInfo) => {
    // Handle token verification errors
    if (err) {
      console.error(err);
      return res.status(403).json("Token is not valid!");
    }

    // SQL query to insert a new like into the database
    const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
    const values = [userInfo.id, req.body.postId];

    // Execute the query
    db.query(q, [values], (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send a success message in the response
      return res.status(200).json("Post has been liked.");
    });
  });
};

// Controller function to delete a like from a post
export const deleteLike = (req, res) => {
  // Extract the JWT token from the request cookies
  const token = req.cookies.accessToken;

  // Check if the token exists
  if (!token) return res.status(401).json("Not logged in!");

  // Verify the token and extract user information
  jwt.verify(token, "secretkey", (err, userInfo) => {
    // Handle token verification errors
    if (err) {
      console.error(err);
      return res.status(403).json("Token is not valid!");
    }

    // SQL query to delete a like from the database
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    // Execute the query
    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send a success message in the response
      return res.status(200).json("Post has been disliked.");
    });
  });
};
