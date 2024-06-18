// Import React hooks, styling, context, and data fetching utilities
import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

// Stories component for displaying user stories
const Stories = () => {
  // Access the current user information from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Fetch stories data using React Query
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  // TODO: Add story functionality using React Query mutations and the upload function.

  // Render the Stories component
  return (
    <div className="stories">
      {/* Current User's Story */}
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {/* Display Stories */}
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
