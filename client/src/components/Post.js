import "../styles/postComponent/post.css";

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-details">
        <small>{post.name}</small>
        <small>{post.date_public}</small>
      </div>
      <div className="post-info">
        <p>{post.description}</p>
      </div>
      <div className="card-buttons"></div>
    </div>
  );
};

export default Post;
