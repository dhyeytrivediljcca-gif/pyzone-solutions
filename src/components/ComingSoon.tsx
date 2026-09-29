import { useNavigate } from "react-router-dom";
import { Clock, ArrowLeft, Terminal } from "lucide-react";

interface ComingSoonProps {
  questionId: number;
  questionTitle: string;
}

export default function ComingSoon({ questionId, questionTitle }: ComingSoonProps) {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-wrap fade-in-up" role="region" aria-label="Solution Coming Soon">
      {/* Icon */}
      <div className="coming-soon-icon" aria-hidden="true">
        <Clock size={32} />
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="coming-soon-h3">Solution Coming Soon</h3>
        <p className="coming-soon-p">
          The verified Python code solution for this practical is currently being prepared and will be added soon.
        </p>
      </div>

      {/* Info Chip */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          padding: "0.4rem 0.85rem",
          borderRadius: "9999px",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          maxWidth: "90%",
        }}
      >
        <Terminal size={13} color="var(--accent-yellow)" aria-hidden="true" />
        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
          Practical #{String(questionId).padStart(2, "0")}
        </span>
        <span style={{ color: "var(--border-hover)" }}>•</span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {questionTitle}
        </span>
      </div>

      {/* Actions */}
      <div style={{ marginTop: "0.5rem" }}>
        <button
          className="btn-secondary"
          onClick={() => navigate("/")}
          id="coming-soon-back-btn"
          aria-label="Back to practical questions list"
          type="button"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to All Questions</span>
        </button>
      </div>
    </div>
  );
}
