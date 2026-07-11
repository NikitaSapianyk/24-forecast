import logo from "../assets/logo.png";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import whatsapp from "../assets/whatsapp.png";

export default function Footer() {
  return (
    <footer className="footer" id="contacts">
      <div className="footer__inner">
        <div className="footer__logo">
          <img src={logo} alt="24/7 forecast" />
        </div>

        <div className="footer__column">
          <h4 className="footer__title">Address</h4>
          <p className="footer__text">Svobody str. 35</p>
          <p className="footer__text">Kyiv</p>
          <p className="footer__text">Ukraine</p>
        </div>

        <div className="footer__column">
          <h4 className="footer__title">Contact us</h4>
          <div className="footer__socials">
            <a href="#" className="footer__social-link" aria-label="Instagram">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="#" className="footer__social-link" aria-label="Facebook">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" className="footer__social-link" aria-label="WhatsApp">
              <img src={whatsapp} alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
