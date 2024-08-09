import React from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from 'react-icons/fa';
import './Footer.css'; // Falls du CSS in einer separaten Datei hast

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>Kontakt</h3>
        <div className="contact-info">
          <p>Patrick Strehse</p>
          <p>Geissfluhweg 17</p>
          <p>5018 Erlinsbach </p>
          <p>079 963 58 47</p>
          <p>patrick-j@windowslive.jom</p>
        </div>
      </div>
      <div className="footer-right">
        <h3>Folge mir</h3>
        <div className="social-icons">
          <a href="https://www.instagram.com/vieiratiago91/"><FaInstagram /></a>
          <a href="https://www.facebook.com/people/Tiago-Vieira/100063557804042/"><FaFacebook /></a>
        </div>
      </div>
      <div className="copyright">
        <p>© Damian Eisenring</p>
      </div>
    </footer>
  );
};

export default Footer;
