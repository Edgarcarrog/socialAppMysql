import socialMedia from "../assets/social-media.png";
// import "../styles/homePage/home.css";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  localStorage.removeItem("user");
  return (
    <main className="login-page">
      <section className="main-banner">
        <div>
          <h1>Social App</h1>
          <h2 className="">Conoce personas, crea lazos</h2>
        </div>
        <div className="main-image">
          <img className="img" src={socialMedia} alt="social media" />
        </div>
      </section>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
