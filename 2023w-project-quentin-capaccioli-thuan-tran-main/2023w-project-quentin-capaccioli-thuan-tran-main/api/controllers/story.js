import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Controller function to get stories
export const getStories = (req, res) => {
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

    // SQL query to retrieve stories with user information and relationship status
    const q = `
      SELECT s.*, name FROM stories AS s 
      JOIN users AS u ON (u.id = s.userId)
      LEFT JOIN relationships AS r ON (s.userId = r.followedUserId AND r.followerUserId = ?) 
      LIMIT 4`;

    // Execute the query
    db.query(q, [userInfo.id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send the stories in the response
      return res.status(200).json(data);
    });
  });
};

// Controller function to add a new story
export const addStory = (req, res) => {
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

    // SQL query to insert a new story into the database
    const q = "INSERT INTO stories(`img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    // Execute the query
    db.query(q, [values], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send success message in the response
      return res.status(200).json("Story has been created.");
    });
  });
};

// Controller function to delete a story
export const deleteStory = (req, res) => {
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

    // SQL query to delete a story from the database
    const q = "DELETE FROM stories WHERE `id`=? AND `userId` = ?";

    // Execute the query
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Check if the delete affected any rows and respond accordingly
      if (data.affectedRows > 0)
        return res.status(200).json("Story has been deleted.");

      // If no rows were affected, user doesn't have permission to delete
      return res.status(403).json("You can delete only your story!");
    });
  });
};
