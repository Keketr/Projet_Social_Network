import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Controller function to get comments for a specific post
export const getComments = (req, res) => {
  // SQL query to retrieve comments for a particular post
  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  // Execute the query
  db.query(q, [req.query.postId], (err, data) => {
    // Handle potential errors
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // Send comments for the specified post in the response
    return res.status(200).json(data);
  });
};

// Controller function to add a comment to a post
export const addComment = (req, res) => {
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

    // SQL query to insert a new comment into the database
    const q =
      "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];

    // Execute the query
    db.query(q, [values], (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send a success message in the response
      return res.status(200).json("Comment has been created.");
    });
  });
};

// Controller function to delete a comment from a post
export const deleteComment = (req, res) => {
  // Extract the JWT token from the request cookies
  const token = req.cookies.access_token;

  // Check if the token exists
  if (!token) return res.status(401).json("Not authenticated!");

  // Verify the token and extract user information
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    // Handle token verification errors
    if (err) {
      console.error(err);
      return res.status(403).json("Token is not valid!");
    }

    // Extract comment ID from request parameters
    const commentId = req.params.id;

    // SQL query to delete a comment from the database
    const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

    // Execute the query
    db.query(q, [commentId, userInfo.id], (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Check if the comment was deleted successfully
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");

      // If the comment was not deleted, send a permission error message
      return res.status(403).json("You can delete only your comment!");
    });
  });
};
