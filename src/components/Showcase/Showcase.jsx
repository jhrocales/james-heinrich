import { useEffect, useRef, useState } from "react";
import "./Showcase.css";
import DesignsImage from "../../assets/Showcase Page/designs.png";
import TestimonialsImage from "../../assets/Showcase Page/testimonials.png";
import SEOImage from "../../assets/Showcase Page/SEO.png";

const SLIDES = [
  { id: 1, label: "Customer Centered Design", image: DesignsImage },
  { id: 2, label: "Verified Client Feedback", image: TestimonialsImage },
  { id: 3, label: "Proven SEO Strategies", image: SEOImage },
];

export default function Showcase() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goTo = (index) => {
    if (index === active) return;

    setDirection(index > active ? "next" : "prev");
    setActive(index);
  };

  const goPrev = () => {
    setDirection("prev");
    setActive((current) => (current === 0 ? SLIDES.length - 1 : current - 1));
  };

  const goNext = () => {
    setDirection("next");
    setActive((current) => (current + 1) % SLIDES.length);
  };

  const currentSlide = SLIDES[active];

  return (
    <section className="showcase" ref={sectionRef}>
      <div className="showcase__container">
        <h2
          className="showcase__title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          What I provide
        </h2>

        <div
          className="showcase__gallery"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(60px)",
            transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
          }}
        >
          <div className="showcase__devices">
            <button
              className="showcase__control showcase__control--prev"
              onClick={goPrev}
              type="button"
              aria-label="Previous showcase"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <img
              key={currentSlide.id}
              className={`showcase__designs showcase__designs--from-${direction}`}
              src={currentSlide.image}
              alt={`${currentSlide.label} showcase`}
              draggable={false}
            />

            <button
              className="showcase__control showcase__control--next"
              onClick={goNext}
              type="button"
              aria-label="Next showcase"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="showcase__ellipse-spot" aria-hidden="true" />

          <div className="showcase__divider" />

          <div className="showcase__label-wrap">
            <p
              key={currentSlide.label}
              className={`showcase__label showcase__label--from-${direction}`}
            >
              {currentSlide.label}
            </p>
          </div>

          <div
            className="showcase__dots"
            role="tablist"
            aria-label="Slide indicators"
          >
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                className={`showcase__dot ${
                  index === active ? "showcase__dot--active" : ""
                }`}
                onClick={() => goTo(index)}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={slide.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
