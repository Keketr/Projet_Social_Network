import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Controller function to get posts
export const getPosts = (req, res) => {
  // Extract user ID from the request query
  const userId = req.query.userId;

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

    // Construct the SQL query based on the provided conditions
    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;

    // Construct the parameter values based on the provided conditions
    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    // Execute the query
    db.query(q, values, (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send the retrieved posts in the response
      return res.status(200).json(data);
    });
  });
};

// Controller function to add a new post
export const addPost = (req, res) => {
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

    // SQL query to insert a new post into the database
    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    // Execute the query
    db.query(q, [values], (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send a success message in the response
      return res.status(200).json("Post has been created.");
    });
  });
};

// Controller function to delete a post
export const deletePost = (req, res) => {
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

    // SQL query to delete a post from the database
    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    // Execute the query
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Check if the post was deleted successfully
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");

      // Send a message indicating that the user can delete only their post
      return res.status(403).json("You can delete only your post");
    });
  });
};
