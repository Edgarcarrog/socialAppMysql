import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { context } from "../../context/context";
import Post from "../../components/Post";
// import "../styles/profile/profile.css";
import ModalComment from "../../components/ModalComment";
import authToken from "../../helpers/authToken";
import HomeNav from "./components/HomeNav";

const HomePage = () => {
  const { user, posts, setPosts, showModal } = useContext(context);

  const [form, setForm] = useState({
    description: "",
    hobbies: [],
  });

  const [activeModal, setActiveModal] = useState(false);

  const allHobbies = [
    { id: "mus", label: "música" },
    { id: "cin", label: "cine" },
    { id: "dep", label: "deportes" },
    { id: "art", label: "arte" },
    { id: "com", label: "comida" },
    { id: "mod", label: "moda" },
    { id: "tec", label: "tecnología" },
    { id: "ani", label: "anime y comics" },
    { id: "fit", label: "fitness" },
    { id: "neg", label: "negocios" },
  ];

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
    if (form.description.trim())
      await clienteAxios.post(`/posts/${user.userId}`, form);
    setForm({
      description: "",
      hobbies: [],
    });
  };

  const handleChange = (e) => {
    if (
      e.target.name === "description" &&
      e.target.value.trim().length <= 255
    ) {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
      if (e.target.checked) {
        setForm({ ...form, hobbies: [...form.hobbies, e.target.value] });
      } else {
        setForm({
          ...form,
          hobbies: form.hobbies.filter((item) => item !== e.target.value),
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
            <textarea
              className="post__area"
              name="description"
              rows="5"
              placeholder="Comparte un mensaje"
              value={form.description}
              onChange={handleChange}
            />
            <div>
              {allHobbies.map((hobbie) => (
                <label key={hobbie.id}>
                  <input
                    type="checkbox"
                    id={hobbie.id}
                    name={hobbie.id}
                    value={hobbie.id}
                    //checked={true}
                    onChange={handleChange}
                  />
                  {hobbie.label}
                </label>
              ))}
            </div>
            <button
              className="btn btn-primary"
              // disabled={true}
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
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => {
                    showModal(post);
                    setActiveModal(true);
                  }}
                >
                  Comentar
                </button>
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
