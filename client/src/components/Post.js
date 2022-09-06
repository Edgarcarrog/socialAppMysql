import "../styles/post.css";

const Post = ({ post }) => {
  return (
    <div className="card">
      <div className="card-info">
        <p>{post.description}</p>
      </div>
      <div className="card-buttons"></div>
    </div>
  );
};

export default Post;
