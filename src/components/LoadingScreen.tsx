import { useEffect, useState } from "react";
import { PyzoneIcon } from "./Logo";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsExiting(true), 1300);
    const t2 = setTimeout(() => onComplete(), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      className={`loading-screen ${isExiting ? "loading-fade-exit" : ""}`}
      role="status"
      aria-label="Loading Pyzone-Solutions"
    >
      {/* Radial Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.15) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Logo Monogram */}
      <div className="loading-logo-box" aria-hidden="true">
        <PyzoneIcon size={64} />
      </div>

      {/* Brand Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#38bdf8" }}>Pyzone</span>
          <span style={{ color: "#64748b", margin: "0 2px" }}>-</span>
          <span style={{ color: "#f8fafc" }}>Solutions</span>
        </div>
        <div
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: "0.75rem",
            color: "#94a3b8",
            letterSpacing: "0.05em",
          }}
        >
          Initializing Python Practical Workspace...
        </div>
      </div>

      {/* Progress Bar */}
      <div className="loading-bar-wrap" aria-hidden="true">
        <div className="loading-bar-fill" />
      </div>
    </div>
  );
}
