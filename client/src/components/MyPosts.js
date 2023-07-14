import React from "react";
import Post from "./Post";

const MyPosts = ({ data: { myposts, user } }) => {
  return (
    <div>
      {myposts.map((post) => (
        <div key={post.Id}>
          <Post post={post} user={user} />
          <div className="post-foot"></div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
