import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  // Fetch posts data based on the provided userId
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {/* Display an error message if something went wrong */}
      {error
        ? "Something went wrong!"
        : isLoading
        ? // Display a loading message while fetching data
          "Loading"
        : // Map through the fetched posts and render the Post component for each post
          data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
