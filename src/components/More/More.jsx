import { useEffect, useRef } from "react";
import "./More.css";
import CTAButton from "../CTAButton/CTAButton";
import SubtleArrow from "../../assets/Global/arrow-subtle.svg";
import IconGithub from "../../assets/Global/icon-github.svg";
import IconGmail from "../../assets/Global/icon-gmail.svg";
import IconLinkedIn from "../../assets/Global/icon-linkedin.svg";

function LowkeyButton({ label, arrowLeft = false, href = "#" }) {
  return (
    <a href={href} className="btn-lowkey">
      <span className="btn-lowkey__dome" aria-hidden="true" />
      <span className="btn-lowkey__spec" aria-hidden="true" />

      {arrowLeft && (
        <>
          <span className="btn-lowkey__arrow btn-lowkey__arrow--left">
            <img src={SubtleArrow} alt="" aria-hidden="true" />
          </span>
          <span className="btn-lowkey__divider" aria-hidden="true" />
        </>
      )}

      <span className="btn-lowkey__label">{label}</span>

      {!arrowLeft && (
        <>
          <span className="btn-lowkey__divider" aria-hidden="true" />
          <span className="btn-lowkey__arrow btn-lowkey__arrow--right">
            <img src={SubtleArrow} alt="" aria-hidden="true" />
          </span>
        </>
      )}
    </a>
  );
}

function ExploreCard() {
  return (
    <div className="card card--side card--explore">
      <span className="card__specular" aria-hidden="true" />
      <div className="card__dome" aria-hidden="true" />
      <div className="card__base" aria-hidden="true" />

      <p className="card__tag card__tag--left">About</p>

      <div className="card__content">
        <h3 className="card__title">{`More\nAbout Me`}</h3>

        <p className="card__body">
          Skill alone does not get anything far, especially in building that
          lasts. Get to know more about me — my story, personality, approach,
          and work philosophy.
        </p>

        <LowkeyButton label="Explore" arrowLeft={true} href="#about" />
      </div>
    </div>
  );
}

function ConnectCard() {
  return (
    <div className="card card--center">
      <span className="card__specular" aria-hidden="true" />
      <div className="card__dome" aria-hidden="true" />
      <div className="card__base" aria-hidden="true" />

      <p className="card__tag card__tag--center">Connect</p>

      <div className="card__content">
        <h3 className="card__title">{`Let's Establish\nYour Vision`}</h3>

        <p className="card__body">
          True impact happens exactly where character and technical mastery
          meet. If my work philosophy and end-to-end development expertise align
          with your goals, let's build something exceptional together.
        </p>

        <div className="card__icon-links" aria-label="Social links">
          <a
            href="mailto:hello@example.com"
            className="card__icon-link"
            aria-label="Email"
          >
            <img src={IconGmail} alt="" aria-hidden="true" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card__icon-link"
            aria-label="LinkedIn"
          >
            <img src={IconLinkedIn} alt="" aria-hidden="true" />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card__icon-link"
            aria-label="GitHub"
          >
            <img src={IconGithub} alt="" aria-hidden="true" />
          </a>
        </div>

        <CTAButton
          label="Elevate Your Brand"
          href="#connect"
          showArrow={false}
        />
      </div>
    </div>
  );
}

function DiscoverCard() {
  return (
    <div className="card card--side card--discover">
      <span className="card__specular" aria-hidden="true" />
      <div className="card__dome" aria-hidden="true" />
      <div className="card__base" aria-hidden="true" />

      <p className="card__tag card__tag--right">Discover</p>

      <div className="card__content">
        <h3 className="card__title">{`Designs &\nSystems I've Built`}</h3>

        <p className="card__body">
          Character alone cannot execute a vision, especially when performance
          and scale are non-negotiable. Explore the technical architectures,
          seamless designs, and robust workflows I've engineered.
        </p>

        <LowkeyButton label="Discover" arrowLeft={false} href="#work" />
      </div>
    </div>
  );
}

export default function More() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll(
      ".more__eyebrow, .card--explore, .card--center, .card--discover",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="more" aria-label="More Information" ref={sectionRef}>
      <div className="more__eyebrow" aria-hidden="true">
        <span className="more__eyebrow-word">Explore</span>
        <span className="more__eyebrow-dot">·</span>
        <span className="more__eyebrow-word">Connect</span>
        <span className="more__eyebrow-dot">·</span>
        <span className="more__eyebrow-word">Discover</span>
      </div>

      <div className="more__grid">
        <ExploreCard />
        <ConnectCard />
        <DiscoverCard />
      </div>
    </section>
  );
}
