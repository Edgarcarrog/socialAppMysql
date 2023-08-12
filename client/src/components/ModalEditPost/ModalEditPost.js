import React, { useEffect, useState, useContext } from "react";
import clienteAxios from "../../config/axios";

const ModalEditPost = ({ active, setActiveModal }) => {
  return (
    <section className="edit-post">
      <div className="edit-post__delete">
        <span>Eliminar</span>
      </div>
      <div>
        <span>Editar</span>
      </div>
    </section>
  );
};

export default ModalEditPost;
