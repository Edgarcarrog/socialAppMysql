import "dayjs/locale/es";
import dayjs from "dayjs";
import { context } from "../context/context";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import isYesterday from "dayjs/plugin/isYesterday";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import authToken from "../helpers/authToken";
import clienteAxios from "../config/axios";
import Rating from "@mui/material/Rating";

// Load plugins
dayjs.extend(relativeTime);

//dayjs.extend(utc);
dayjs.extend(isYesterday);
dayjs.locale("es");

const Post = ({ post, user }) => {
  const { setMyPosts } = useContext(context);

  const TAG_CATEGORIES = {
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

  const tags = post.tags ? post.tags.split(",").sort() : null;

  const [toggleLike, setToggleLike] = useState(false);

  useEffect(() => {
    chargeLike();
  }, []);

  useEffect(() => {
    getPosts();
  }, [toggleLike]);

  const getPosts = async () => {
    const token = localStorage.getItem("user");
    const myPosts = await clienteAxios.get(`/myposts/${token}`);
    setMyPosts(myPosts.data.data);
  };

  const chargeLike = async () => {
    const token = localStorage.getItem("user");
    const data = { postId: post.Id, token };
    const isLiked = await clienteAxios.post("/get-like", data);
    setToggleLike(!!isLiked.data.data.length);
  };

  const changeNumLikes = async () => {
    //authToken();
    const token = localStorage.getItem("user");
    const data = { postId: post.Id, token };
    if (toggleLike) {
      setToggleLike(!toggleLike);
      await clienteAxios.post("/subslike", data);
    } else {
      setToggleLike(!toggleLike);
      await clienteAxios.post("/addlike", data);
    }
  };

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
          <strong>{post.name}</strong>
        </small>
        <small>
          <strong> · </strong>
        </small>
        <small>{date}</small>
      </div>
      <div className="post-info">
        <p>{post.description}</p>
      </div>
      <div>
        <Rating
          name="rate"
          defaultValue={5}
          precision={0.5}
          value={post.rate}
          readOnly
        />
      </div>
      <div className="heart-content" onClick={changeNumLikes}>
        <div>
          <span className={`like ${toggleLike ? "hidden" : ""}`}>
            <AiOutlineHeart />
          </span>
          <span className={`like ${!toggleLike ? "hidden" : ""}`}>
            <AiFillHeart />
          </span>
        </div>
        <span className="numb">{post.likes}</span>
      </div>
      <div className="tags-container">
        {tags &&
          tags.map((tag) => (
            <div key={tag}>
              <span>{TAG_CATEGORIES[tag]}</span>
            </div>
          ))}
      </div>
    </article>
  );
};

export default Post;
