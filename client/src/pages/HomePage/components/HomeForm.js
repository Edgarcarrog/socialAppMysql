import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import clienteAxios from "../../../config/axios";
import { context } from "../../../context/context";
import { Categories } from "../constants/Categories";

const HomeForm = () => {
  const { user } = useContext(context);

  const initialFormState = {
    title: "",
    description: "",
    tags: [],
    rate: 5,
  };
  const [form, setForm] = useState(initialFormState);

  const [categories, setCategories] = useState(Categories);

  const handleChange = (e) => {
    if (
      (e.target.name === "description" || e.target.name === "title") &&
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

  const sendPost = async (e) => {
    e.preventDefault();
    if (form.description.trim()) {
      //el campo tags se convierte a String para almacenarlo en la BD
      const tagsStr = form.tags.toString();
      await clienteAxios.post(`/posts/${user.userId}`, {
        title: form.title,
        description: form.description,
        tags: tagsStr,
        rate: form.rate,
      });
    }
    setForm(initialFormState);
    setCategories(Categories);
  };

  return (
    <form className="form__container">
      <div className="rate__form">
        <div className="title">
          <input
            type="text"
            name="title"
            placeholder="Título"
            required
            // ref={focusInput}
            onChange={handleChange}
          />
        </div>
        <div className="post__area">
          <textarea
            name="description"
            rows="5"
            placeholder="Comparte una reseña"
            value={form.description}
            onChange={handleChange}
          />
        </div>
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
  );
};

export default HomeForm;
