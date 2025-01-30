import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data.filePath;
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Error uploading the file. Please try again.");
      throw err;
    }
  };

  const handleClick = async () => {
    let profilePicUrl = "";
    if (file) {
      try {
        profilePicUrl = await upload();
      } catch (err) {
        return;
      }
    }
    try {
      await makeRequest.put('/users/profile_pic', { profile_pic: profilePicUrl });
      setCurrentUser({ ...currentUser, profile_pic: profilePicUrl });
      alert("Profile picture updated successfully");
    } catch (err) {
      console.error("Error updating profile picture:", err);
      alert("Error updating profile picture. Please try again.");
    }
  };

  console.log("currentUser.profile_pic:", currentUser.profile_pic); 

  return (
    <div className="profile">
      <div className="images">
        <img
          src={currentUser.cover_pic ? `http://localhost:8800${currentUser.cover_pic}` : '/default-cover-pic.jpg'}
          alt="cover"
          className="cover"
        />
        <img
          src={currentUser.profile_pic ? `http://localhost:8800${currentUser.profile_pic}` : '/default-profile-pic.jpg'}
          alt="profile"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>Jane Doe</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <div className="upload">
          <input 
            type="file" 
            id="file" 
            style={{ display: "none" }} 
            onChange={e => setFile(e.target.files[0])} 
          />
          <label htmlFor="file">
            <button>Choose Profile Picture</button>
          </label>
          <button onClick={handleClick}>Update Profile Picture</button>
        </div>
      <Posts/>
      </div>
    </div>
  );
};

export default Profile;
