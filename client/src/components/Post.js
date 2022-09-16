import "dayjs/locale/es";
import dayjs from "dayjs";
import "../styles/postComponent/post.css";
//import { es } from "dayjs/locale/es";

//dayjs.locale("es");

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-details">
        <small>{post.name}</small>
        <small>
          {dayjs(post.date).locale("es").format("ddd D MMM YYYY", "es")}
        </small>
      </div>
      <div className="post-info">
        <p>{post.description}</p>
      </div>
      <div className="card-buttons"></div>
    </div>
  );
};

export default Post;
