import socialMedia from "../assets/social-media.png";
import "../styles/home/home.css";
import Login from "./Login";

const HomePage = () => {
  return (
    <main className="main-page">
      <div className="container">
        <header>
          <h1 className="title">Social App</h1>
          <h2 className="subtitle">Conoce personas, crea amistades</h2>
          <div className="image-container">
            <img src={socialMedia} alt="social media" />
          </div>
        </header>
        <Login />
      </div>
    </main>
  );
};

export default HomePage;
