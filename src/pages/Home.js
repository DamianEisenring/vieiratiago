import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Stil für die Home-Seite

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

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
        <div className="third-section">
          <h1>Unterstütze mich auf meinem Weg</h1>
          <Link to="/partner" className="btn" onClick={scrollToTop}>
            Mehr Erfahren
          </Link>
        </div>
      </div>
      <div className="fourth-home-container">
      <a
          href="https://www.angiologie-aargau.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/sponsor_image/zentrumfürgefässmedizin.png"
            alt="Zentrum für Gefässmedizin"
          />
        </a>
        <a
          href="https://www.medandmotion.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/med&motion.png" alt="Med&Motion" />
        </a>
        <a
          href="https://www.din-masseur.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/dinmasseur.png" alt="Din Masseur" />
        </a>
        <a
          href="https://portugies.ch/cms/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/portugies.png" alt="Portugies" />
        </a>
        <a
          href="https://www.verofit.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/verofit.png" alt="Verofit" />
        </a>
      </div>
      <div className="fourth-home-container">
        <a href="https://www.zdl.ch/" target="_blank" rel="noopener noreferrer">
          <img
            src="/sponsor_image/zimmerlibau.png"
            alt="Zimmerli Dach & Lukarnenbau AG"
          />
        </a>
        <a
          href="https://www.morininet.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/morininet_logo.png" alt="Morininete" />
        </a>
        <a
          href="https://combinvest.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/combinvest.png" alt="Combinvest" />
        </a>
        <a
          href="https://buchserbier.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/buchserbier.png" alt="Buchser" />
        </a>
        <a
          href="https://www.kanalfrei.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/kanalfrei.png" alt="Kanalfrei" />
        </a>
      </div>
      <div className="fourth-home-container">
        <a
          href="https://www.edelstark.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/edel&stark.png" alt="Edel&Stark" />
        </a>
        <a
          href="http://www.schaubmanagement.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/mcdonalds.png" alt="Schaub Management" />
        </a>
        <a
          href="https://www.redfish.li/"
          target="_blank"
          rel="noopener noreferrer"
          className="Redfish"
        >
          <img src="/sponsor_image/Logo Redfish.png" alt="Redfish" />
        </a>
        <a
          href="https://www.jaisli-beck.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/sponsor_image/jaisli-beck_logo.png" 
          alt="Jaisli-Beck" />
        </a>
      </div>
    </div>
  );
};

export default Home;
