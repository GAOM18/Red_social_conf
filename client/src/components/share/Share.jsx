import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      console.log("Upload response:" , res.data);
      return res.data.filePath;
    } catch (err) {
      console.error("Error uploading file:", err); // Log the full error for debugging
      alert("Error uploading the file. Please try again."); // Example user alert
      throw err; // Re-throw the error to be caught by the calling function
    }
  };

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await makeRequest.post('/posts', newPost);
      console.log("Post creation response:", response.data); // Log the response from the post creation
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) {
      try {
        imgUrl = await upload();
      } catch (err) {
        // Handle the error if needed
        return;
      }
    }
    const newPost = { description, img: imgUrl };
    console.log("Payload:", newPost); // Log the payload for debugging
    mutation.mutate(newPost);
    setDescription("")
    setFile(null)
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">

          <img
            src={currentUser.profile_pic}
            alt="Profile"
          />
          <input 
            type="text" 
            placeholder={`What's on your mind ${currentUser.name}?`} 
            onChange={e => setDescription(e.target.value)} 
            value={description}
          />      
         </div>
         <div className="right">
          {file && <img className="file" alt="File" src={URL.createObjectURL(file)}/>}
         </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input 
              type="file" 
              id="file" 
              style={{ display: "none" }} 
              onChange={e => setFile(e.target.files[0])} 
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
