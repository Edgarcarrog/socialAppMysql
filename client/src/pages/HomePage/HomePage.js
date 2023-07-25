import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { context } from "../../context/context";
import Post from "../../components/Post";
// import "../styles/profile/profile.css";
import ModalComment from "../../components/ModalComment";
import authToken from "../../helpers/authToken";
import HomeNav from "./components/HomeNav";
import Rating from "@mui/material/Rating";

const HomePage = () => {
  const allCategories = [
    { id: "mus", label: "música", checked: false },
    { id: "cin", label: "cine", checked: false },
    { id: "dep", label: "deportes", checked: false },
    { id: "art", label: "arte", checked: false },
    { id: "com", label: "comida", checked: false },
    { id: "mod", label: "moda", checked: false },
    { id: "tec", label: "tecnología", checked: false },
    { id: "ani", label: "anime y comics", checked: false },
    { id: "fit", label: "fitness", checked: false },
    { id: "neg", label: "negocios", checked: false },
  ];

  const { user, posts, setPosts, showModal } = useContext(context);

  const initialFormState = {
    description: "",
    tags: [],
    rate: 5,
  };
  const [form, setForm] = useState(initialFormState);

  const [activeModal, setActiveModal] = useState(false);

  const [categories, setCategories] = useState(allCategories);

  useEffect(() => {
    try {
      setData();
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setData = async () => {
    authToken();
    const token = localStorage.getItem("user");
    const posts = await clienteAxios.get(`/otherposts/${token}`);
    setPosts(posts.data.data);
  };

  const sendPost = async (e) => {
    e.preventDefault();
    if (form.description.trim()) {
      //el campo tags se convierte a String para almacenarlo en la BD
      const tagsStr = form.tags.toString();
      await clienteAxios.post(`/posts/${user.userId}`, {
        description: form.description,
        tags: tagsStr,
        rate: form.rate,
      });
    }
    setForm(initialFormState);
    setCategories(allCategories);
  };

  const handleChange = (e) => {
    if (
      e.target.name === "description" &&
      e.target.value.trimEnd().length <= 255
    ) {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else if (e.target.name === "rate") {
      setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
    } else {
      //cambia el estado "checked" del elemento dependiendo de target.value
      setCategories(
        categories.map((item) => {
          if (item.id === e.target.value) {
            return {
              ...item,
              checked: !item.checked,
            };
          }
          return item;
        })
      );
      if (e.target.checked) {
        setForm({ ...form, tags: [...form.tags, e.target.value] });
      } else {
        setForm({
          ...form,
          tags: form.tags.filter((item) => item !== e.target.value),
        });
      }
    }
  };

  return (
    <>
      <main className="main__container">
        <HomeNav />
        <div className="post__container">
          <form>
            <div className="post__area">
              <textarea
                name="description"
                rows="5"
                placeholder="Comparte un mensaje"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Rating
                className="rating"
                name="rate"
                defaultValue={5}
                precision={0.5}
                value={form.rate}
                onChange={handleChange}
              />
            </div>
            <div>
              {categories.map((categorie) => (
                <div key={categorie.id} className="post__option">
                  <input
                    className="post__option-check"
                    type="checkbox"
                    id={categorie.id}
                    value={categorie.id}
                    checked={categorie.checked}
                    onChange={handleChange}
                  />
                  <label htmlFor={categorie.id} className="post__option-label">
                    {categorie.label}
                  </label>
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary"
              disabled={!form.description.trim()}
              onClick={sendPost}
            >
              Publicar
            </button>
          </form>
        </div>
        <div className="btn-container"></div>
        <div>
          <h3>Últimas publicaciones</h3>
        </div>
        <div className="posts-container">
          {posts &&
            posts.map((post) => (
              <div key={post.Id}>
                <Post post={post} />
                {/* <button
                  className="btn btn-primary btn-small"
                  onClick={() => {
                    showModal(post);
                    setActiveModal(true);
                  }}
                >
                  Comentar
                </button> */}
              </div>
            ))}
        </div>
      </main>
      {/* //TODO
       <ModalComment active={activeModal} setActiveModal={setActiveModal} /> */}
    </>
  );
};

export default HomePage;
