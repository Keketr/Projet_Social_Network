// Import styling and assets
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

// Share component for creating and posting content
const Share = () => {
  // State for managing the selected file and post description
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  // Function to upload a file using Axios
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Access the current user information from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Create a query client for invalidating and refetching data
  const queryClient = useQueryClient();

  // Create a mutation for posting new content
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch posts data
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Handle click event when sharing content
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    // Upload the file if selected
    if (file) imgUrl = await upload();
    // Mutate and post the new content
    mutation.mutate({ desc, img: imgUrl });
    // Reset description and file states
    setDesc("");
    setFile(null);
  };

  // Render the Share component
  return (
    <div className="share">
      <div className="container">
        {/* Top Section - User Input */}
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {/* Display selected file preview */}
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        {/* Bottom Section - Additional Options and Share Button */}
        <div className="bottom">
          <div className="left">
            {/* Add Image Option */}
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            {/* Add Place Option */}
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            {/* Tag Friends Option */}
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          {/* Share Button */}
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
