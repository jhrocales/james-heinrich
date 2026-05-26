import "./Hero.css";
import HeroProfile from "/images/Hero-Profile.png";

import logo1 from "../../assets/Hero Section Logo's/Logo1-TSE.webp";
import logo2 from "../../assets/Hero Section Logo's/Logo2-SFS.webp";
import logo3 from "../../assets/Hero Section Logo's/Logo3-TCE.webp";
import logo4 from "../../assets/Hero Section Logo's/Logo4-PCE.webp";
import logo5 from "../../assets/Hero Section Logo's/Logo5-EagleI.webp";
import logo6 from "../../assets/Hero Section Logo's/Logo6-Pixley.webp";
import logo7 from "../../assets/Hero Section Logo's/Logo7-IHB.webp";
import logo8 from "../../assets/Hero Section Logo's/Logo8-GCC.webp";
import logo9 from "../../assets/Hero Section Logo's/Logo9-Metadvanced.webp";

import CTAButton from "../CTAButton/CTAButton";

export default function Hero() {
  const logos = [
    {
      src: logo1,
      alt: "Texas Service Experts Logo",
    },
    {
      src: logo2,
      alt: "Space Fireplace Services Logo",
    },
    {
      src: logo3,
      alt: "Texas Chimney Experts Logo",
    },
    {
      src: logo4,
      alt: "Prime Chimney Experts Logo",
    },
    {
      src: logo5,
      alt: "Eagle I Services Logo",
    },
    {
      src: logo6,
      alt: "Pixley LLC Logo",
    },
    {
      src: logo7,
      alt: "Impact Home Builders Logo",
    },
    {
      src: logo8,
      alt: "Green Cleaner Carpet Cleaning Services Logo",
    },
    {
      src: logo9,
      alt: "Metadvanced Logo",
    },
  ];

  return (
    <section className="hero section">
      {/* Ambient Orbs */}
      <div className="hero__orb hero__orb--1"></div>
      <div className="hero__orb hero__orb--2"></div>

      {/* Main Container */}
      <div className="hero__container section__container">
        {/* LEFT SIDE */}
        <div className="hero__content">
          <h1 className="hero__name">James Heinrich</h1>

          <p className="hero__tagline">
            Design. Development. SEO.
            <br />
            The Polymathic Approach to WordPress.
          </p>

          <div className="hero__cta-row">
            <CTAButton />

            <div className="hero__proof">
              <span className="hero__proof-num">25+</span>

              <span className="hero__proof-label">
                Businesses &
                <br />
                Brands Scaled
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero__photo-wrap">
          <div className="hero__photo-glow"></div>

          <img className="hero__photo" src={HeroProfile} alt="James Heinrich" />

          <div className="hero__photo-mask-left"></div>
          <div className="hero__photo-mask-bottom"></div>
          <div className="hero__photo-mask-top"></div>
        </div>
      </div>

      {/* Divider */}
      <div className="hero__divider"></div>

      {/* Trusted By */}
      <div className="hero__trusted">
        <span className="hero__trusted-label">Trusted by</span>

        <div className="hero__logos">
          <div className="hero__logos-track">
            {/* FIRST SET */}
            {logos.map((logo, index) => (
              <img
                key={`first-${index}`}
                className="hero__logo"
                src={logo.src}
                alt={logo.alt}
              />
            ))}

            {/* DUPLICATE SET */}
            {logos.map((logo, index) => (
              <img
                key={`second-${index}`}
                className="hero__logo"
                src={logo.src}
                alt={logo.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
