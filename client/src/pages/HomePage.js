import socialMedia from "../assets/social-media.png";
import "../styles/homePage/home.css";
import Login from "../components/Login";

const HomePage = () => {
  localStorage.removeItem("user");
  return (
    <main className="main-page">
      <div className="container home-container">
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
