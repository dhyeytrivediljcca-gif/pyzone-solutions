import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code2, Sparkles, BookOpen } from "lucide-react";
import { PyzoneIcon } from "./Logo";

export default function Hero() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Parallax tilt on mouse move for desktop
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero-section" aria-label="Hero section">
      {/* Background ambient lighting and grid pattern */}
      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="hero-inner fade-in-up">
        {/* Left Column: Heading & CTAs */}
        <div className="hero-left">
          {/* Eyebrow Badge */}
          <div className="section-eyebrow">
            <Sparkles size={13} aria-hidden="true" />
            <span>PYTHON • PRACTICALS • SOLUTIONS</span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading">
            Welcome to{" "}
            <span className="gradient-text">Pyzone</span>
            <span style={{ color: "var(--text-muted)" }}>-</span>
            <span className="gradient-text-yellow">Solutions</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Explore Python practical questions and solutions in one place. Curated for semester 5 students, revisions, and rapid reference.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button
              className="btn-primary"
              onClick={() => scrollToSection("questions")}
              id="hero-explore-btn"
              aria-label="Explore practical questions"
              type="button"
            >
              <Code2 size={18} aria-hidden="true" />
              <span>Explore Questions</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <button
              className="btn-secondary"
              onClick={() => scrollToSection("about")}
              id="hero-about-btn"
              aria-label="Learn about this project"
              type="button"
            >
              <BookOpen size={16} aria-hidden="true" />
              <span>About Project</span>
            </button>
          </div>

          {/* Quick Start Link */}
          <div>
            <button
              onClick={() => navigate("/question/1")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--accent-blue)",
                fontSize: "0.85rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.4rem 0.6rem",
                borderRadius: "6px",
              }}
              aria-label="Directly open Question 1"
              type="button"
            >
              <span>Quick start with Practical #01</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Right Column: Floating Interactive Code Terminal Card */}
        <div
          className="hero-right"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <div className="hero-code-card">
            <div className="hero-code-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div className="traffic-lights">
                  <div className="tl" style={{ background: "#ef4444" }} />
                  <div className="tl" style={{ background: "#f59e0b" }} />
                  <div className="tl" style={{ background: "#10b981" }} />
                </div>
                <span style={{ fontSize: "0.75rem", fontFamily: "'Fira Code', monospace", color: "#94a3b8", marginLeft: "0.5rem" }}>
                  pyzone_practical.py
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <PyzoneIcon size={18} />
              </div>
            </div>

            <div className="hero-code-body">
              <div style={{ color: "#64748b", fontStyle: "italic", marginBottom: "0.5rem" }}>
                # Practical #01: Swap without temp variable
              </div>
              <div>
                <span className="tk-keyword">def </span>
                <span className="tk-function">swap_numbers</span>
                <span style={{ color: "#e2e8f0" }}>(a: </span>
                <span className="tk-builtin">int</span>
                <span style={{ color: "#e2e8f0" }}>, b: </span>
                <span className="tk-builtin">int</span>
                <span style={{ color: "#e2e8f0" }}>):</span>
              </div>
              <div style={{ paddingLeft: "1.25rem" }}>
                <span className="tk-comment"># Tuple packing & unpacking</span>
              </div>
              <div style={{ paddingLeft: "1.25rem" }}>
                <span style={{ color: "#e2e8f0" }}>a, b = b, a</span>
              </div>
              <div style={{ paddingLeft: "1.25rem" }}>
                <span className="tk-keyword">return </span>
                <span style={{ color: "#e2e8f0" }}>a, b</span>
              </div>
              <div style={{ marginTop: "0.65rem" }}>
                <span className="tk-builtin">print</span>
                <span style={{ color: "#e2e8f0" }}>(</span>
                <span className="tk-string">f"Swapped: {"{swap_numbers(10, 20)}"} "</span>
                <span style={{ color: "#e2e8f0" }}>)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
