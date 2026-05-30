import { useEffect, useState } from "react";
import "./Header.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "FAQs", href: "#faqs" },
  { label: "Connect", href: "#connect" },
];

function MenuToggleIcon({ open = false }) {
  return (
    <svg
      className={`nav__menu-icon${open ? " is-open" : ""}`}
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path
        className="nav__menu-path nav__menu-path--fold"
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path className="nav__menu-path" d="M7 16 27 16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateHeaderState();

    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const closeOnDesktop = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isMenuOpen]);

  return (
    <header className={`header${isScrolled ? " header--scrolled" : ""}`}>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav__depth"></div>
        <div className="nav__edge"></div>

        <button
          className="nav__menu-toggle"
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuToggleIcon />
        </button>

        {NAV_LINKS.map((link, index) => (
          <a
            key={link.href}
            className={`nav__link${index === 0 ? " nav__link--active" : ""}`}
            href={link.href}
          >
            {link.label}
            {index === 0 && <span className="nav__underline"></span>}
          </a>
        ))}
      </nav>

      <div
        id="mobile-menu"
        className={`nav-overlay${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="nav-overlay__top">
          <div className="nav-overlay__logo-space" aria-hidden="true" />

          <button
            className="nav-overlay__close"
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="nav-overlay__links" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              className={`nav-overlay__link${
                index === 0 ? " nav-overlay__link--active" : ""
              }`}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-overlay__spacer" aria-hidden="true" />

        <div className="nav-overlay__icons" aria-label="Social links">
          <a href="#" className="nav-overlay__icon" aria-label="Social link" />
          <a href="#" className="nav-overlay__icon" aria-label="Social link" />
          <a href="#" className="nav-overlay__icon" aria-label="Social link" />
        </div>
      </div>
    </header>
  );
}
