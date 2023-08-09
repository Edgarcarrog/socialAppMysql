import Post from "./Post";
import { context } from "../context/context";
import { useContext } from "react";

const MyPosts = ({ data: { myposts, user } }) => {
  const { setMyPosts } = useContext(context);
  return (
    <div>
      {myposts.map((post) => (
        <div key={post.Id}>
          <Post post={post} user={user} updateFunc={setMyPosts} />
          <div className="post-foot"></div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
