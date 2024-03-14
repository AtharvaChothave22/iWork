import React, { useEffect, useState } from "react";
import PostCard from "./PostCard"; // Adjust the path based on your project structure
import instance from "./shared/axios";
import baseUrl from "../util";

const PostList = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    instance
      .get(
        `http://localhost:9091/freelancing/api/allPosts?pageNumber=0&pageSize=10&sortBy=Id&sortDirection=descending`
      )
      .then((res) => {
        setPost(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
