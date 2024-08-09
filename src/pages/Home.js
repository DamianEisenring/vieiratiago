import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Stil für die Home-Seite

const Home = () => {
  return (
    <div>
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Viera Tiago</h1>
            <p>Schwinger</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="second-home-container">
        <div className="second-section">
          <div className="second-text">
            <h2>Portrait</h2>
            <h3>Über mich und meine Schwingkarriere</h3>
            <Link to="/portrait" className="btn">
              Zum Portrait
            </Link>
          </div>
        </div>
      </div>

      <div className="third-home-container">
        <img src="/image/home_to_sponsoren.png" alt="Logo" />
        <div>
          <h1>Unterstütze mich auf meinem Weg</h1>
          <Link to="/partner" className="btn">
            Mehr Erfahren
          </Link>
        </div>
      </div>
      <div className="fourth-home-container">
        <a href="https://www.jaisli-beck.ch/" target="_blank" rel="noopener noreferrer">
          <img src="/image/jaisli-beck_logo.png" alt="Jaisli-Beck" />
        </a>
        <a href="https://www.jaisli-beck.ch/" target="_blank" rel="noopener noreferrer">
          <img src="/image/jaisli-beck_logo.png" alt="Jaisli-Beck" />
        </a>
        <a href="https://www.jaisli-beck.ch/" target="_blank" rel="noopener noreferrer">
          <img src="/image/jaisli-beck_logo.png" alt="Jaisli-Beck" />
        </a>
        <a href="https://www.jaisli-beck.ch/" target="_blank" rel="noopener noreferrer">
          <img src="/image/jaisli-beck_logo.png" alt="Jaisli-Beck" />
        </a>
      </div>
    </div>
  );
};

export default Home;
