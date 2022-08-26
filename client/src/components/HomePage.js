import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Posts</h1>
      <Link className="btn" to="/profile">
        Perfil
      </Link>
    </div>
  );
};

export default HomePage;
