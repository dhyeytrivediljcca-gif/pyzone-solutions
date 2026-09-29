import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import { ArrowUp, FlaskConical, GraduationCap } from "lucide-react";

export default function Footer() {
  const location = useLocation();

  const handleNav = (anchor: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${anchor}`;
      return;
    }
    const el = document.getElementById(anchor);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" role="contentinfo" aria-label="Pyzone-Solutions Footer">
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Logo size={32} showText={true} />
          <p className="footer-desc">
            Python Practical Questions & Solutions — an interactive code library built for semester 5 students.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginTop: "0.25rem" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <GraduationCap size={15} color="var(--accent-blue)" aria-hidden="true" />
              <span>Developed by <strong>Dhyey Trivedi</strong> (BS(BCA) Semester-5)</span>
            </div>
            <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", paddingLeft: "1.35rem" }}>
              Under the guidance of <strong>Prof. Parth Joshi</strong> (Mentor AiRA LAB)
            </div>
            <div style={{ fontSize: "0.825rem", color: "var(--accent-blue)", paddingLeft: "1.35rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <FlaskConical size={13} aria-hidden="true" />
              <span>Member of <strong>AiRA LAB</strong></span>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
            Quick Navigation
          </div>
          <button className="footer-link-item" onClick={scrollToTop} type="button">
            Home
          </button>
          <button className="footer-link-item" onClick={() => handleNav("questions")} type="button">
            Python Practicals Library
          </button>
          <button className="footer-link-item" onClick={() => handleNav("about")} type="button">
            About Project & Credentials
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <div>© 2026 Pyzone-Solutions. All rights reserved.</div>
        <button
          onClick={scrollToTop}
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            padding: "0.35rem 0.75rem",
            borderRadius: "6px",
            fontSize: "0.78rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
          aria-label="Scroll back to top"
          type="button"
        >
          <span>Back to top</span>
          <ArrowUp size={13} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
