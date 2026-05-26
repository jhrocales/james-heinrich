import "./CTAButton.css";

export default function CTAButton({
  label = "Elevate Your Brand",
  href = "#connect",
  showArrow = true,
}) {
  return (
    <a
      href={href}
      className={`cta-btn${!showArrow ? " cta-btn--no-arrow" : ""}`}
      aria-label={label}
    >
      <span className="cta-btn__specular"></span>

      <span className="cta-btn__sheen"></span>

      <span className="cta-btn__label">{label}</span>

      {showArrow && (
        <>
          <span className="cta-btn__divider"></span>

          <span className="cta-btn__arrow">
            <svg
              width="15"
              height="15"
              fill="none"
              stroke="#C4B5FD"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </>
      )}
    </a>
  );
}
