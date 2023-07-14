import "dayjs/locale/es";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

import isYesterday from "dayjs/plugin/isYesterday";

// Load plugins
dayjs.extend(relativeTime);

//dayjs.extend(utc);
dayjs.extend(isYesterday);
dayjs.locale("es");

const Post = ({ post, user }) => {
  const tagCategories = {
    ani: "anime y comics",
    art: "arte",
    cin: "cine",
    com: "comida",
    dep: "deportes",
    fit: "fitness",
    mod: "moda",
    mus: "música",
    neg: "negocios",
    tec: "tecnología",
  };

  const tags = post.tags.split(",").sort();

  let date = dayjs(post.date).locale("es").fromNow();
  if (
    (!date.includes("hora") &&
      !date.includes("minuto") &&
      !date.includes("segundo")) ||
    dayjs(post.date).isYesterday()
  )
    date = dayjs(post.date).format("ddd D MMM YYYY", "es");

  return (
    <article className="post-card">
      <div className="post-details">
        <small>
          <strong>{user.name}</strong>
        </small>
        <small>
          <strong> · </strong>
        </small>
        <small>{date}</small>
      </div>
      <div className="post-info">
        <p>{post.description}</p>
      </div>
      <div className="tags-container">
        {tags.map((tag) => (
          <div key={tag}>
            <span>{tagCategories[tag]}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Post;
