import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import React, { useContext, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from "../../context/authContext";
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () => makeRequest.get(`/likes?post_id=${post.id}`).then(res => res.data)
  });

  console.log(data)

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post?.profile_pic || '/default-profile-pic.jpg'} alt="profile" />
            <div className="details">
              <Link to={`/profile/${post.user_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{formatDistanceToNow(new Date(post.created_at))} ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post?.description || 'No description available.'}</p>
          {post.img && <img src={post.img} alt="" />}
        </div>
        <div className="info">
          <div className="item">
          {data && data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon  />
            )}
            {data ? data.length : 0} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments post_id={post.id} />}
      </div>
    </div>
  );
};

export default Post;