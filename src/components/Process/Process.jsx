import { useEffect, useRef, useState } from "react";
import "./Process.css";
import iconDiscovery from "../../assets/process-icons/discovery.svg";
import iconAlignment from "../../assets/process-icons/alignment.svg";
import iconDesign from "../../assets/process-icons/design.svg";
import iconDevelopment from "../../assets/process-icons/development.svg";
import iconGrowth from "../../assets/process-icons/growth.svg";

const LEFT_CX = 38;
const RIGHT_CX = 74;

const STEPS = [
  {
    id: 1,
    icon: iconDiscovery,
    label: "Discovery",
    description:
      "We talk about your business, goals, audience, and what your website needs to do.",
    col: "left",
  },
  {
    id: 2,
    icon: iconAlignment,
    label: "Alignment",
    description:
      "We agree on scope, budget, timeline, pages, and responsibilities before starting.",
    col: "right",
  },
  {
    id: 3,
    icon: iconDesign,
    label: "Design",
    description:
      "We shape the visual direction, from colors and typography to layouts, images, and key sections.",
    col: "left",
  },
  {
    id: 4,
    icon: iconDevelopment,
    label: "Development",
    description:
      "We turn the approved design into a working website, test it, and publish it live.",
    col: "right",
  },
  {
    id: 5,
    icon: iconGrowth,
    label: "Growth",
    description:
      "We keep your website healthy with updates, SEO improvements, security checks, and refinements.",
    col: "left",
  },
];

const FLOW_ANCHORS = [
  {
    from: { node: 0, x: 1, y: 0.5 },
    to: { node: 1, x: 0.08, y: 0.28 },
  },
  {
    from: { node: 1, x: 0.08, y: 0.72 },
    to: { node: 2, x: 0.92, y: 0.28 },
  },
  {
    from: { node: 2, x: 0.92, y: 0.72 },
    to: { node: 3, x: 0.08, y: 0.28 },
  },
  {
    from: { node: 3, x: 0.08, y: 0.72 },
    to: { node: 4, x: 0.92, y: 0.5 },
  },
];

const NODE_D = 11;
const PAD_TOP = 5;
const PAD_BOT = 5;
const LABEL_GAP = 1;
const MOBILE_VERTICAL_SCALE = 0.8;
const MOBILE_NODE_D = 16;
const MOBILE_LABEL_GAP = 0.5;
const MOBILE_X_SPREAD = 5;

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    const update = () => {
      setMatches(media.matches);
    };

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, [query]);

  return matches;
}

function GlassNode({ icon, visible, delay }) {
  return (
    <div
      className="pv-node"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.6)",
      }}
    >
      <div className="pv-node__backdrop" />
      <div className="pv-node__highlight" />
      <div className="pv-node__dome" />
      <div className="pv-node__icon">
        <img src={icon} alt="" draggable={false} />
      </div>
      <div className="pv-node__base" />
      <div className="pv-node__inset" />
    </div>
  );
}

function StepLabel({ label, description, side, visible, delay }) {
  return (
    <div
      className={`pv-label pv-label--${side}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : `translateX(${side === "left" ? "-10px" : "10px"})`,
      }}
    >
      <span className="pv-label__title">{label}</span>
      <span className="pv-label__sub">{description}</span>
    </div>
  );
}

function getSegmentPath(segment) {
  const { from, to } = segment;
  const dx = to.x - from.x;
  const c1x = from.x + dx * 0.58;
  const c2x = to.x - dx * 0.58;

  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
}

function FlowLine({ segments, width, height, visible, activeFlow }) {
  if (!width || !height || !segments.length) return null;

  return (
    <svg
      className={`pv-flow${visible ? " is-visible" : ""}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="pv-flow-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E0FF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#6D28D9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id="pv-flow-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3B0FA0" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="pv-flow-specular" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {segments.map((segment, index) => {
        const pathD = getSegmentPath(segment);

        return (
          <g
            key={index}
            className={`pv-flow__segment ${
              activeFlow === index ? "is-active" : ""
            }`}
            style={{ "--flow-delay": `${index * 260}ms` }}
          >
            <path
              className="pv-flow__path pv-flow__bloom"
              d={pathD}
              pathLength={1}
            />
            <path
              className="pv-flow__path pv-flow__chrome"
              d={pathD}
              pathLength={1}
            />
            <path
              className="pv-flow__path pv-flow__glass"
              d={pathD}
              pathLength={1}
            />
            <path
              className="pv-flow__path pv-flow__shadow"
              d={pathD}
              pathLength={1}
            />
            <path
              className="pv-flow__path pv-flow__specular"
              d={pathD}
              pathLength={1}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function Process() {
  const [activeFlow, setActiveFlow] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const nodeRefs = useRef([]);
  const [visible, setVisible] = useState(false);
  const [flow, setFlow] = useState({
    width: 0,
    height: 0,
    segments: [],
  });

  const isMobileLayout = useMediaQuery("(max-width: 640px)");

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
      {
        threshold: 0.25,
        rootMargin: "0px 0px -20% 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frameOne;
    let frameTwo;

    const updateFlow = () => {
      const canvasRect = canvas.getBoundingClientRect();

      const getAnchorPoint = (anchor) => {
        const node = nodeRefs.current[anchor.node];
        if (!node) return null;

        const rect = node.getBoundingClientRect();

        return {
          x: rect.left - canvasRect.left + rect.width * anchor.x,
          y: rect.top - canvasRect.top + rect.height * anchor.y,
        };
      };

      const segments = FLOW_ANCHORS.map((anchor) => {
        const from = getAnchorPoint(anchor.from);
        const to = getAnchorPoint(anchor.to);

        if (!from || !to) return null;

        return { from, to };
      }).filter(Boolean);

      const next = {
        width: canvasRect.width,
        height: canvasRect.height,
        segments,
      };

      setFlow((current) => {
        const sameSize =
          Math.abs(current.width - next.width) < 0.5 &&
          Math.abs(current.height - next.height) < 0.5;

        const sameSegments =
          current.segments.length === next.segments.length &&
          current.segments.every((segment, i) => {
            const nextSegment = next.segments[i];

            return (
              Math.abs(segment.from.x - nextSegment.from.x) < 0.5 &&
              Math.abs(segment.from.y - nextSegment.from.y) < 0.5 &&
              Math.abs(segment.to.x - nextSegment.to.x) < 0.5 &&
              Math.abs(segment.to.y - nextSegment.to.y) < 0.5
            );
          });

        return sameSize && sameSegments ? current : next;
      });
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);

      frameOne = requestAnimationFrame(() => {
        updateFlow();
        frameTwo = requestAnimationFrame(updateFlow);
      });
    };

    const ro = new ResizeObserver(scheduleUpdate);

    ro.observe(canvas);
    nodeRefs.current.forEach((node) => {
      if (node) ro.observe(node);
    });

    window.addEventListener("resize", scheduleUpdate);

    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      ro.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isMobileLayout]);

  const baseUsableH = 100 - PAD_TOP - PAD_BOT;
  const usableH = isMobileLayout
    ? baseUsableH * MOBILE_VERTICAL_SCALE
    : baseUsableH;

  const padTop = isMobileLayout ? (100 - usableH) / 2 : PAD_TOP;
  const rowH = usableH / (STEPS.length - 1);

  const nodeD = isMobileLayout ? MOBILE_NODE_D : NODE_D;
  const nodeR = nodeD / 2;
  const labelGap = isMobileLayout ? MOBILE_LABEL_GAP : LABEL_GAP;

  const cy = STEPS.map((_, i) => padTop + i * rowH);

  const mobileLeftCx = LEFT_CX - MOBILE_X_SPREAD;
  const mobileRightCx = RIGHT_CX + MOBILE_X_SPREAD;

  const cx = STEPS.map((s) => {
    if (!isMobileLayout) return s.col === "left" ? LEFT_CX : RIGHT_CX;

    return s.col === "left" ? mobileLeftCx : mobileRightCx;
  });

  return (
    <section className="provide" ref={sectionRef}>
      <h2
        className="provide__heading"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        Collaboration
        <br />
        Process
      </h2>

      <div className="provide__canvas" ref={canvasRef}>
        <FlowLine
          segments={flow.segments}
          width={flow.width}
          height={flow.height}
          visible={visible}
          activeFlow={activeFlow}
        />

        {STEPS.map((step, i) => {
          const delay = i * 120;
          const isLeft = step.col === "left";

          return (
            <div key={step.id}>
              <div
                ref={(node) => {
                  if (node) nodeRefs.current[i] = node;
                }}
                className="pv-node-wrap"
                style={{
                  left: `${cx[i]}%`,
                  top: `${cy[i]}%`,
                  width: `${nodeD}%`,
                }}
                onMouseEnter={() => {
                  setActiveFlow(i < FLOW_ANCHORS.length ? i : null);
                }}
                onMouseLeave={() => {
                  setActiveFlow(null);
                }}
              >
                <GlassNode icon={step.icon} visible={visible} delay={delay} />
              </div>

              <div
                className={`pv-label-wrap pv-label-wrap--${step.col}`}
                style={{
                  top: `${cy[i]}%`,
                  ...(isLeft
                    ? { left: `${cx[i] - nodeR - labelGap}%` }
                    : { left: `${cx[i] + nodeR + labelGap}%` }),
                }}
              >
                <StepLabel
                  label={step.label}
                  description={step.description}
                  side={step.col}
                  visible={visible}
                  delay={delay}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
