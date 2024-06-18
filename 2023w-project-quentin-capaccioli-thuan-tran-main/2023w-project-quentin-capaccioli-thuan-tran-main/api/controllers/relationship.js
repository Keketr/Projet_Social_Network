import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Controller function to get followers for a specific user
export const getRelationships = (req, res) => {
  // SQL query to retrieve followers based on followedUserId
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  // Execute the query
  db.query(q, [req.query.followedUserId], (err, data) => {
    // Handle potential errors
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // Send the list of follower user IDs in the response
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

// Controller function to add a new relationship (follow a user)
export const addRelationship = (req, res) => {
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

    // SQL query to insert a new relationship into the database
    const q =
      "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
    const values = [userInfo.id, req.body.userId];

    // Execute the query
    db.query(q, [values], (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send a success message in the response
      return res.status(200).json("Following");
    });
  });
};

// Controller function to delete a relationship (unfollow a user)
export const deleteRelationship = (req, res) => {
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

    // SQL query to delete a relationship from the database
    const q =
      "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    // Execute the query
    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      // Handle potential errors
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Send a success message in the response
      return res.status(200).json("Unfollow");
    });
  });
};
