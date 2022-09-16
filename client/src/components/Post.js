import "dayjs/locale/es";
import dayjs from "dayjs";
import "../styles/postComponent/post.css";
import relativeTime from "dayjs/plugin/relativeTime";
//import utc from "dayjs/plugin/utc";

import isYesterday from "dayjs/plugin/isYesterday";

// Load plugins
dayjs.extend(relativeTime);

//dayjs.extend(utc);
dayjs.extend(isYesterday);
dayjs.locale("es");

const Post = ({ post }) => {
  console.log(dayjs(post.date).isYesterday());
  let date = dayjs(post.date).locale("es").fromNow();
  if (
    !date.includes("hora") &&
    !date.includes("minuto") &&
    !date.includes("segundo") &&
    !dayjs(post.date).isYesterday()
  )
    date = dayjs(post.date).format("ddd D MMM YYYY", "es");

  return (
    <div className="post-card">
      <div className="post-details">
        <small>{post.name}</small>
        <small>{date}</small>
      </div>
      <div className="post-info">
        <p>{post.description}</p>
      </div>
      <div className="card-buttons"></div>
    </div>
  );
};

export default Post;
