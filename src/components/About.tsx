import { Code2, BookOpen, Zap, UserCheck, GraduationCap, Award, FlaskConical, Terminal, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="about-section" aria-label="About this project and developer credentials">
      <div className="about-grid">
        {/* Left Column: Project Overview & Features */}
        <div>
          <div className="section-eyebrow">
            <BookOpen size={13} aria-hidden="true" />
            <span>ABOUT THE PROJECT</span>
          </div>

          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            About <span className="gradient-text-blue">Pyzone-Solutions</span>
          </h2>

          <p className="section-subtitle" style={{ marginBottom: "1rem" }}>
            Pyzone-Solutions is a digital collection of Python practical questions and solutions created for learning, revision, and quick reference.
          </p>

          <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
            Designed specifically for semester 5 students with hands-on code examples, each solution addresses practical requirements with clean, tested implementations.
          </p>

          {/* Key Feature Badges */}
          <div className="about-feature-list">
            <div className="about-feature-item">
              <div className="about-feature-icon" aria-hidden="true">
                <BookOpen size={18} />
              </div>
              <div>
                <div className="about-feature-label">17 Practical Problems</div>
                <div className="about-feature-desc">Comprehensive coverage of core Python concepts, OOP, and data structures.</div>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="about-feature-icon" aria-hidden="true">
                <Code2 size={18} />
              </div>
              <div>
                <div className="about-feature-label">Verified Python 3 Code</div>
                <div className="about-feature-desc">Clean, executable code with syntax highlighting and instant one-click copy.</div>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="about-feature-icon" aria-hidden="true">
                <Zap size={18} />
              </div>
              <div>
                <div className="about-feature-label">Instant Interactive Search</div>
                <div className="about-feature-desc">Real-time keyword and topic filtering for fast exam preparation.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Developer Credential Card */}
        <div>
          <div className="dev-card fade-in-up">
            {/* Header Badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <span className="dev-label">
                <Terminal size={14} aria-hidden="true" />
                ACADEMIC & PROJECT CREDENTIALS
              </span>
              <span className="badge badge-available">
                <CheckCircle2 size={11} aria-hidden="true" />
                Verified
              </span>
            </div>

            {/* Developer Section */}
            <div className="dev-section-block">
              <div className="dev-label">
                <UserCheck size={14} aria-hidden="true" />
                DEVELOPED BY
              </div>
              <div className="dev-name">Dhyey Trivedi</div>
              <div className="dev-sub" style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <GraduationCap size={15} color="var(--accent-blue)" aria-hidden="true" />
                <span>BS(BCA) Semester-5</span>
              </div>
            </div>

            <div className="dev-divider" />

            {/* Guidance Section */}
            <div className="dev-section-block">
              <div className="dev-label">
                <Award size={14} aria-hidden="true" />
                UNDER THE GUIDANCE OF
              </div>
              <div className="dev-name" style={{ fontSize: "1.15rem" }}>Prof. Parth Joshi</div>
              <div className="dev-sub">Mentor AiRA LAB</div>
            </div>

            <div className="dev-divider" />

            {/* Laboratory Affiliation */}
            <div className="dev-section-block">
              <div className="dev-label">
                <FlaskConical size={14} aria-hidden="true" />
                LABORATORY AFFILIATION
              </div>
              <div style={{ marginTop: "0.4rem" }}>
                <span className="aira-tag">
                  <FlaskConical size={15} aria-hidden="true" />
                  Member of AiRA LAB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
