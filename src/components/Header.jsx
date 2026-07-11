import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useUser } from "../context/UserContext";
import SignUpModal from "./SignUpModal";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";

export default function Header() {
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <a href="#" className="header__logo">
            <img src={logo} alt="24/7 forecast" />
          </a>

          <nav className="header__nav">
            <a href="#about" className="header__nav-link">Who we are</a>
            <a href="#contacts" className="header__nav-link">Contacts</a>
            <a href="#menu" className="header__nav-link">Menu</a>
          </nav>

          <div className="header__actions">
            {user ? (
              <>
                <span className="header__username">Hi, {user.name}</span>
                <div className="header__avatar">
                  <img src={userIcon} alt="User" />
                </div>
              </>
            ) : (
              <>
                <button className="btn-primary header__signup" onClick={() => setModalOpen(true)}>
                  Sign Up
                </button>
                <button
                  className="btn-primary header__signup header__signup--mobile"
                  onClick={() => setModalOpen(true)}
                >
                  Sign Up
                </button>
                <div className="header__avatar">
                  <img src={userIcon} alt="User" />
                </div>
              </>
            )}
            <button className="header__burger" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="mobile-menu__panel" onClick={(e) => e.stopPropagation()}>
          <button className="mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close">
            <FiX />
          </button>
          <a href="#about" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Who we are</a>
          <a href="#contacts" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Contacts</a>
          <a href="#menu" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>Menu</a>
          {!user && (
            <button
              className="btn-primary btn-primary--block"
              onClick={() => { setMenuOpen(false); setModalOpen(true); }}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>

      <SignUpModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
