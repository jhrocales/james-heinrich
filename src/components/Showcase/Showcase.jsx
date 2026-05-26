import { useEffect, useRef, useState } from "react";
import "./Showcase.css";
import DesignsImage from "../../assets/Showcase Page/designs.png";
import TestimonialsImage from "../../assets/Showcase Page/testimonials.png";
import SEOImage from "../../assets/Showcase Page/SEO.png";

/* ─── Figma Assets ───────────────────────────────────────────────── */
const IMG_ELLIPSE2 =
  "https://www.figma.com/api/mcp/asset/057862df-d629-43ef-9dbf-3f9ff51dbeb3";
const IMG_ELLIPSE1 =
  "https://www.figma.com/api/mcp/asset/db5aa46a-b05c-4d70-807b-0becd122059f";

/* ─── Slides ─────────────────────────────────────────────────────── */
const SLIDES = [
  { id: 1, label: "Customer Centered Design", image: DesignsImage },
  { id: 2, label: "Verified Client Feedback", image: TestimonialsImage },
  { id: 3, label: "Proven SEO Strategies", image: SEOImage },
];

export default function Showcase() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

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

  useEffect(() => {
    if (!visible) return;

    const t = setInterval(() => {
      setAnimating(true);

      setTimeout(() => {
        setActive((p) => (p + 1) % SLIDES.length);
        setAnimating(false);
      }, 400);
    }, 3500);

    return () => clearInterval(t);
  }, [visible]);

  const goTo = (i) => {
    if (i === active || animating) return;

    setAnimating(true);

    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 400);
  };

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
          <div
            className={`showcase__devices ${
              animating ? "showcase__devices--exit" : "showcase__devices--enter"
            }`}
          >
            <img
              className="showcase__designs"
              src={SLIDES[active].image}
              alt={`${SLIDES[active].label} showcase`}
              draggable={false}
            />
          </div>

          <div className="showcase__ellipse-spot">
            <img src={IMG_ELLIPSE2} alt="" draggable={false} />
          </div>

          <div className="showcase__divider" />

          <div className="showcase__label-wrap">
            <p
              className={`showcase__label ${
                animating ? "showcase__label--exit" : "showcase__label--enter"
              }`}
            >
              {SLIDES[active].label}
            </p>
          </div>

          <div
            className="showcase__dots"
            role="tablist"
            aria-label="Slide indicators"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                className={`showcase__dot ${
                  i === active ? "showcase__dot--active" : ""
                }`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={s.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
