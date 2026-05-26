import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header className={`header${isScrolled ? " header--scrolled" : ""}`}>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav__depth"></div>
        <div className="nav__edge"></div>

        <a className="nav__link nav__link--active" href="#home">
          Home
          <span className="nav__underline"></span>
        </a>

        <a className="nav__link" href="#work">
          Work
        </a>

        <a className="nav__link" href="#about">
          About
        </a>

        <a className="nav__link" href="#faqs">
          FAQs
        </a>

        <a className="nav__link" href="#connect">
          Connect
        </a>
      </nav>
    </header>
  );
}
