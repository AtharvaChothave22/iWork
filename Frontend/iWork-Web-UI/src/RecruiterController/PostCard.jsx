import React from "react";
import "./Post.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.image} alt="Post" className="post-image" />
        <div className="post-title">{post.title}</div>
      </div>
      <div className="post-description">{post.description}</div>
      <div className="post-details">
        <span className="post-budget">{post.budget}</span>
        <span className="post-status">
          {post.status ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="post-comments">
        <h4>Comments</h4>
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostCard;
