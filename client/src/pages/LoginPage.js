import socialMedia from "../assets/social-media.png";
// import "../styles/homePage/home.css";
import Login from "../components/Login";

const LoginPage = () => {
  localStorage.removeItem("user");
  return (
    <main className="login-page">
      <section className="main-banner">
        <h1 className="main-text">Social App</h1>
        <h2 className="">Conoce personas, crea lazos</h2>
        <div className="main-image">
          <img className="img" src={socialMedia} alt="social media" />
        </div>
      </section>
      <Login />
    </main>
  );
};

export default LoginPage;
